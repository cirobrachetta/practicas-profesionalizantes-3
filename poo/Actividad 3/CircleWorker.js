let position = 0;
let direction = 1;
let windowWidth = 800;
let paused = true;

onmessage = (event) => {
  const { action, windowWidth: w } = event.data;

  if (action === 'init') {
    windowWidth = w;
  } else if (action === 'resume') {
    paused = false;
  } else if (action === 'pause') {
    paused = true;
  } else if (action === 'reset') {
    position = 0;
    direction = 1;
  }
};

function update() {
  if (!paused) {
    position += 2 * direction;

    // BOUNCE: evitar que se salga
    if (position >= windowWidth - 50) {
      position = windowWidth - 50;
      direction = -1;
    }
    if (position <= 0) {
      position = 0;
      direction = 1;
    }

    postMessage({ position });
  }

  setTimeout(update, 1000 / 60);
}

update();