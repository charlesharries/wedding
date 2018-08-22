const form = document.querySelector('.music-form');

function handleSubmit(e) {
  e.preventDefault();
  const titleInput = document.querySelector('input[name="title"]');
  const title = titleInput.value;
  const artistInput = document.querySelector('input[name="artist"]');
  const artist = artistInput.value;

  console.log(title, artist);

  fetch('http://localhost:3000/music', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      artist,
    }),
  }).then(res => res.json()).then((res) => {
    const submitResponse = document.querySelector('.submit-response');

    console.log(res);
    submitResponse.classList.remove('error');
    submitResponse.classList.add(res.type);
    if (res.type === 'success') {
      submitResponse.innerHTML = 'Added <span class="title result"></span> by <span class="artist result"></span>!';
      document.querySelector('.title.result').innerText = res.title;
      document.querySelector('.artist.result').innerText = res.artist;
    } else if (res.type === 'error') {
      submitResponse.innerHTML = res.messages.join('<br>');
    }
  });

  titleInput.value = '';
  artistInput.value = '';
  titleInput.focus();
}

form.addEventListener('submit', handleSubmit);
