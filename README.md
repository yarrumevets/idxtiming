# IDX Timing Adjuster &#127909;

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Introduction

Adjusts all subtitle timings in an idx file.
This is useful if you have subtitles in .idx & .sub format, but the timings of all subtitles are shifted.
I made this app to solve a specific problem I was encountering where subtitles were always a little off (too early or too late).
Limitations in popular subtitle editors made it impossible to open the idx files, and adjusting timings manually would take a very long time.

## Installation

Step-by-step instructions on how to get the development environment running.

```bash
git clone https://github.com/yarrumevets/idxtiming.git
cd idxtiming
yarn
```

## Usage

```bash
node server.js
```

Go to `http://localhost:3838` in your browser.

- Choose an idx file.
- Provide an offset (in miliseconds).
- Upload.
- A converted file will download automatically.

## License

Distributed under the MIT License. See the LICENSE file for more information.
