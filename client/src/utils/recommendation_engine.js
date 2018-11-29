export function soup(temp, value, soup) {
  if (temp > 2) {
    value = value + 0;
  } else if (temp > -2 && temp <= 2) {
    value = value + 2;
  } else if (temp > -6 && temp <= -2) {
    value = value + 3;
  } else if (temp > -10 && temp <= -6) {
    value = value + 5;
  } else {
    value = value + 6;
  }

  if (value === 15 || value === 11 || value === 7 || value === 2) {
    return soup[3];
  } else if (value === 13 || value === 8 || value === 5 || value === 1) {
    return soup[0];
  } else if (value === 14 || value === 9 || value === 3 || value === 4) {
    return soup[2];
  } else {
    return soup[1];
  }
}

export function main(temp, value, main) {
  if (temp > 1) {
    value = value + 0;
  } else if (temp > -2 && temp <= 1) {
    value = value + 2;
  } else if (temp > -5 && temp <= -2) {
    value = value + 3;
  } else if (temp > -8 && temp <= -5) {
    value = value + 5;
  } else {
    value = value + 6;
  }

  if (value === 14 || value === 8 || value === 3 || value === 2) {
    return main[3];
  } else if (value === 12 || value === 9 || value === 5 || value === 1) {
    return main[0];
  } else if (value === 15 || value === 11 || value === 7 || value === 4) {
    return main[2];
  } else {
    return main[1];
  }
}

export function side(temp, value, side) {
  if (temp > 2) {
    value = value + 0;
  } else if (temp > -2 && temp <= 2) {
    value = value + 2;
  } else if (temp > -4 && temp <= -2) {
    value = value + 3;
  } else if (temp > -6 && temp <= -4) {
    value = value + 5;
  } else {
    value = value + 6;
  }

  if (value === 11 || value === 6 || value === 1 || value === 0) {
    return side[3];
  } else if (value === 10 || value === 7 || value === 3 || value === 2) {
    return side[0];
  } else if (value === 13 || value === 9 || value === 5 || value === 4) {
    return side[2];
  } else {
    return side[1];
  }
}

export function drink(temp, value, drink) {
  if (temp > -1) {
    value = value + 0;
  } else if (temp > -4 && temp <= -1) {
    value = value + 1;
  } else if (temp > -7 && temp <= -4) {
    value = value + 2;
  } else if (temp > -10 && temp <= -7) {
    value = value + 3;
  } else {
    value = value + 4;
  }

  if (value === 11 || value === 6 || value === 1 || value === 0) {
    return drink[3];
  } else if (value === 10 || value === 7 || value === 3 || value === 2) {
    return drink[0];
  } else {
    return drink[1];
  }
}
