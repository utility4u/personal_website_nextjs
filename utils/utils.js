export function addListeners(fncScroll, fncTouch) {
  if (window.addEventListener) {
    window.addEventListener('mousewheel', fncScroll, false);
    window.addEventListener('wheel', fncScroll, false);
    window.addEventListener('keyup', fncScroll, false);
    window.addEventListener('touchstart', fncTouch, false);
    window.addEventListener('touchmove', fncTouch, false);
    window.addEventListener('touchend', fncTouch, false);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // if (!('ontouchstart' in window)) {
        //     window.body.style = "overflow: scroll;";
        //     window.documentElement.style = "overflow: scroll;";
        // }
    }
  } else {
      window.attachEvent('onmousewheel', fncScroll, false);
      window.attachEvent('onkeyup', fncScroll, false);
  }
}

export function removeListeners(fncScroll, fncTouch) {
  if (window.addEventListener) {
    window.removeEventListener('mousewheel', fncScroll, false);
    window.removeEventListener('wheel', fncScroll, false);
    window.removeEventListener('keyup', fncScroll, false);
    window.removeEventListener('touchstart', fncTouch, false);
    window.removeEventListener('touchmove', fncTouch, false);
    window.removeEventListener('touchend', fncTouch, false);
  } else {
      window.detachEvent('onmousewheel', fncScroll, false);
      window.detachEvent('onkeyup', fncScroll, false);
  }
}

export function cc(...clasList) {
  return clasList.join(' ');
}

export function pause(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function write(func, text, time) {
  const charList = text.split('');
  const charListLength = charList.length;

  function getTimeout() {
    return Math.round(time);
  }

  function addChar(char = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        func((value = '') => value.slice(0,-1) + char + '|');
        resolve();
      }, getTimeout());
    });
  }

  return new Promise(async(resolve) => {
    for (let x = 0; x < charListLength; x++) {
      await addChar(charList[x]);
    }

    //removeCursor
    func((value) => value.slice(0, -1));
    resolve();
  });
}

export function truncateDecimal(number, template) {
  const dotIndex = `${template}`.indexOf('.');
  if (dotIndex < 0) {
    return number;
  } 

  const decimalLeght = `${template}`.slice(dotIndex + 1).length;
  const dotIndexNumber = `${number}`.indexOf('.');

  if (dotIndexNumber < 0) {
    return `${number}.${'0'.repeat(decimalLeght)}`;
  }

  return `${number}`.slice(0, dotIndexNumber + decimalLeght + 1);
}