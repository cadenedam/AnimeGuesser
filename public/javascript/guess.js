document.getElementById('submit-guess').addEventListener('click', function() {
    const guess = document.getElementById('guess-input').value.toLowerCase();
    const title = songTitle.toLowerCase();

    if (guess === title) {
        document.getElementById('song-info').style.display = 'block';
        document.getElementById('guess-form').style.display = 'none';
        alert('Correct! Here are the song details');
    } else {
        alert('Incorrect guess :(');
    }
});

document.getElementById('give-up').addEventListener('click', function() {
    document.getElementById('song-info').style.display = 'block';
    document.getElementById('guess-form').style.display = 'none';
});
