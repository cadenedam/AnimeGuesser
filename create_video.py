import os
os.environ["IMAGEMAGICK_BINARY"] = r"C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"

import requests
import json
from moviepy.editor import VideoFileClip, AudioFileClip, TextClip, CompositeVideoClip, concatenate_videoclips
from moviepy.video.fx import resize

def create_video(song_data, output_filename):
    duration = 20
    #Grab song data and set video size to mobile

    song_title = song_data['title']
    song_artist = song_data['artist']
    song_show = song_data['show']
    song_difficulty = song_data['difficulty']
    audio_path = song_data['filePath']
    video_path = song_data['videoPath']
    
    #Grab mystery video (doesn't change, only audio changes)
    mystery_clip = VideoFileClip("./uploads/GTAintro2.mp4", audio=False)
    
    w, h = moviesize = mystery_clip.size
    
    #Grab anime video
    video_path = video_path.split('\\')
    video_file = video_path[2]
    video_path = './uploads/' + video_file
    anime_clip = (VideoFileClip(video_path, audio=False).
                  subclip(10, 20).
                  resize((w/1.5, h/2)).
                  margin( 6, color = (255, 255, 255)).
                  margin( bottom = 20, right = 20, opacity = 0).
                  set_pos('center') )
    
    #Grab audio
    audio_path = audio_path.split('\\')
    audio_file = audio_path[2]
    audio_path = './uploads/' + audio_file
    audio = AudioFileClip(audio_path)
    
    #Set audio to video
    mystery_clip = mystery_clip.set_audio(audio.subclip(0, duration))
    
    #Create text for difficulty and song info
    difficulty = TextClip(f"Difficulty: {song_difficulty}", font='yellowtail', color='white', fontsize=72)
    difficulty_col = difficulty.on_color(size=(mystery_clip.w + difficulty.w, difficulty.h), color=(0,128,0), pos=(15, 'center'), col_opacity=0.6)
    difficulty_mov = difficulty_col.set_pos( lambda t: (max(w/10, int(w-0.5*w*t)), max(5*h/6, int(100*t))) )
    difficulty_mov = difficulty_mov.subclip(0, 10)
    
    title = TextClip(f"Song Title: {song_title}", font='yellowtail', color='green', stroke_color='white', stroke_width=2, fontsize=72)
    title = title.subclip(10, 20)
    title = title.set_position((50, 250))
    
    artist = TextClip(f"Artist: {song_artist}", font='yellowtail', color='green', stroke_color='white', stroke_width=2, fontsize=72)
    artist = artist.subclip(10, 20)
    artist = artist.set_position((50, 350))
    
    show = TextClip(f"Anime: {song_show}", font='yellowtail', color='green', stroke_color='white', stroke_width=2, fontsize=72)
    show = show.subclip(10, 20)
    show = show.set_position((50, 1500))
    
    #Put the videos together
    final_clip = CompositeVideoClip([mystery_clip, difficulty_mov, title.set_start(10), artist.set_start(10), show.set_start(10), anime_clip.set_start(10)])
    final_clip.write_videofile(output_filename, codec="libx264", fps=24)
    
def add_transition(clip1, clip2, duration=1):
    return concatenate_videoclips([clip1.crossfadeout(duration), clip2.crossfadein(duration)], method='compose')

unique_songs = set()

while len(unique_songs) < 3:
    if (len(unique_songs) < 1):
        response = requests.get('http://localhost:5000/create-video?difficulty=Easy')
    elif (len(unique_songs) < 2):
        response = requests.get('http://localhost:5000/create-video?difficulty=Medium')
    else:
        response = requests.get('http://localhost:5000/create-video?difficulty=Hard')
    
    if response.status_code == 200:
        song_data = response.json()
        
        if song_data["_id"] not in unique_songs:
            unique_songs.add(song_data["_id"])
            create_video(song_data, f"guess_this_song_{len(unique_songs)}.mp4")
    else:
        print(f"Error fetching song: {response.status_code}")

video_files = ["guess_this_song_1.mp4", "guess_this_song_2.mp4", "guess_this_song_3.mp4"]
clips = [VideoFileClip(video_file) for video_file in video_files]
final_clip = clips[0]

for i in range(1, len(clips)):
    final_clip = add_transition(final_clip, clips[i])
    
final_clip.write_videofile("guess_the_anime.mp4", codec="libx264", fps=24)
