// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}


// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
'Love you🌸',
'9/21/21, 23:47 - Gautam Malhotra: Love you too',
'Love you for thi😬',
'10/9/21, 23:45 - Gautam Malhotra: Love you',
'10/9/21, 23:46 - Risha Garg: I love you more',
'10/27/21, 14:55 - Gautam Malhotra: Love you',
'10/27/21, 14:56 - Risha Garg: Love you',
'10/30/21, 03:36 - Gautam Malhotra: Anyway, love you',
'10/30/21, 03:59 - Risha Garg: Love you',
'I love you',
'11/9/21, 07:19 - Gautam Malhotra: The I love you part',
'11/9/21, 11:11 - Risha Garg: Love you either way',
'11/9/21, 11:36 - Gautam Malhotra: Yeah, love you too',
'Love you and congratulations once again hehe 🥂🦋',
'Love you 🦋',
'Love you (it’s been too long)(and I mean it so please)',
'Love youu🌚',
'6/24/22, 18:56 - Gautam Malhotra: Love you Rhiya',
'7/5/22, 21:33 - Gautam Malhotra: It\'s that love you keep talking about',
'7/6/22, 01:08 - Gautam Malhotra: Love you ♥️',
'7/6/22, 01:19 - Risha Garg: Love you too bum🙆🏻‍♀️',
'I genuinely am grateful to have you and i love you so much bum you have 0 idea.',
'9/22/22, 23:18 - Gautam Malhotra: Love you bum',
'Love you 🫶🏻',
'9/25/22, 11:24 - Risha Garg: Love you so much',
'9/25/22, 11:26 - Gautam Malhotra: Love you too bum',
'9/27/22, 21:20 - Gautam Malhotra: Love you',
'9/27/22, 21:28 - Risha Garg: Love you more',
'Love you',
'10/10/22, 00:03 - Gautam Malhotra: Love you',
'10/10/22, 06:23 - Risha Garg: Love you more',
'10/10/22, 20:49 - Risha Garg: I LOVE YOUUUI😭😭',
'10/10/22, 20:50 - Gautam Malhotra: Love you too but God damn does that sound incredibly creepy',
'10/10/22, 22:13 - Risha Garg: Love you more',
'10/11/22, 00:28 - Gautam Malhotra: Love you',
'10/11/22, 00:40 - Risha Garg: Love you hehe',
'10/13/22, 01:05 - Gautam Malhotra: Love you',
'Love you',
'Love you 🦋',
'Love you',
'I love you 🦋',
'10/14/22, 10:28 - Gautam Malhotra: Love you too bum',
'10/15/22, 00:29 - Gautam Malhotra: Love you',
'10/15/22, 01:57 - Risha Garg: Love you more',
'10/17/22, 15:11 - Gautam Malhotra: I still love you though, just saying',
'10/18/22, 20:18 - Gautam Malhotra: Love you',
'10/19/22, 21:18 - Gautam Malhotra: Love you',
'10/19/22, 21:53 - Risha Garg: Love you',
'10/19/22, 22:57 - Gautam Malhotra: Love you',
'Love you',
'10/20/22, 02:12 - Gautam Malhotra: Love you more than I can express',
'10/20/22, 19:26 - Gautam Malhotra: Love you too',
'10/22/22, 02:38 - Gautam Malhotra: Love you',
'Love you',
'10/23/22, 01:33 - Gautam Malhotra: Love you bum',
'10/23/22, 01:34 - Risha Garg: Love you so much bum',
'10/24/22, 22:30 - Gautam Malhotra: Love you',
'10/24/22, 22:33 - Risha Garg: Love you',
'10/25/22, 22:44 - Risha Garg: I love you so much',
'10/26/22, 01:12 - Gautam Malhotra: Well done , love you',
'Love you more ♥️',
'I love you and am proud of you ❤️',
'10/27/22, 03:10 - Gautam Malhotra: Love you',
'10/28/22, 03:34 - Gautam Malhotra: Love you bum',
'10/28/22, 04:23 - Risha Garg: love you',
'10/28/22, 23:30 - Gautam Malhotra: Love you',
'Love you',
'10/30/22, 01:43 - Gautam Malhotra: Love you, now and always',
'Love you so much ♥️',
'10/31/22, 15:39 - Risha Garg: I love youu',
'This isn\'t something I haven\'t said but it\'s as true as it can be, I believe in you and love you from the bottom of my heart.',
'Love you Risha',
' I love you so much bum',
'11/3/22, 01:31 - Gautam Malhotra: Love you',
'Love you more ♥️',
'11/3/22, 15:25 - Gautam Malhotra: Love you',
'11/3/22, 16:54 - Risha Garg: Love you',
'11/3/22, 23:44 - Gautam Malhotra: Love you bum',
'11/4/22, 00:52 - Risha Garg: Love you more',
'11/4/22, 18:19 - Risha Garg: I love you For this',
'11/8/22, 03:21 - Gautam Malhotra: Love you bum',
'11/8/22, 05:53 - Risha Garg: Love you more',
'11/8/22, 20:47 - Risha Garg: I love you too',
'11/8/22, 20:49 - Gautam Malhotra: Love you too',
'11/9/22, 20:00 - Gautam Malhotra: Love you',
'11/9/22, 20:00 - Risha Garg: love you too',
'11/10/22, 00:32 - Risha Garg: I love you ♥️',
'11/10/22, 00:32 - Gautam Malhotra: I love you too bum',
'11/11/22, 02:26 - Gautam Malhotra: Love you ♥️',
'Love you so much',
'11/11/22, 17:50 - Risha Garg: Love you',
'11/11/22, 18:18 - Gautam Malhotra: Love you too',
'11/11/22, 23:44 - Gautam Malhotra: Love you bum',
'11/11/22, 23:50 - Risha Garg: Love you more♥️ ',
'11/13/22, 03:02 - Gautam Malhotra: Love you ♥️',
'11/13/22, 05:20 - Risha Garg: Love you',
'11/15/22, 16:16 - Gautam Malhotra: Love you too',
'11/15/22, 22:32 - Gautam Malhotra: Love you bum',
'11/15/22, 22:53 - Risha Garg: Love you too',
'11/20/22, 02:56 - Gautam Malhotra: Love you',
'Love you',
'11/23/22, 18:24 - Risha Garg: Love you more',
'Love you 🫶🏻',
'11/24/22, 01:18 - Gautam Malhotra: Love you bum',
'11/27/22, 03:12 - Gautam Malhotra: I love you and will always do, you\'re fucking great. Don\'t settle for anyone. Bitch you deserve the world.',
'11/27/22, 03:12 - Gautam Malhotra: Love you',
'11/27/22, 03:28 - Gautam Malhotra: I love your heart and your passion towards helping people',
'11/27/22, 03:30 - Gautam Malhotra: I love your confidence',
'11/27/22, 03:35 - Gautam Malhotra: I\'ll regret saying half the shit you read rn but I want you to know that you\'re my star, you\'re my motivation and you\'re my friend. Even if we end up growing apart I\'ll forever love you and want nothing but the best for you',
'11/27/22, 03:48 - Gautam Malhotra: Love you',
'11/27/22, 07:21 - Risha Garg: I love you for this',
'And love you more always',
'Okay? love you too',
'11/27/22, 14:10 - Gautam Malhotra: Love you too',
'11/27/22, 21:12 - Gautam Malhotra: I love you too bum',
'11/28/22, 13:28 - Gautam Malhotra: I\'d love you even if you were a worm',
'11/29/22, 13:31 - Risha Garg: Love you too',
'Love you 🦋',
'11/29/22, 22:36 - Gautam Malhotra: Love you more',
'11/30/22, 17:09 - Gautam Malhotra: Love you bum',
'11/30/22, 23:48 - Gautam Malhotra: Love you lots',
'Love you more',
'12/2/22, 16:39 - Gautam Malhotra: Love you',
'12/2/22, 16:45 - Risha Garg: Love you',
'12/3/22, 01:18 - Gautam Malhotra: Love you 😘',
'12/3/22, 21:49 - Gautam Malhotra: Love you ❤️',
'I love you ♥️',
'12/5/22, 15:57 - Gautam Malhotra: Love you bum',
'12/5/22, 15:57 - Risha Garg: Love you more',
'Love you 🫶🏻',
'12/9/22, 17:34 - Gautam Malhotra: Love you',
'12/10/22, 01:20 - Gautam Malhotra: Love you',
'12/13/22, 04:05 - Gautam Malhotra: Love you bum',
'Love you',
'12/20/22, 22:05 - Risha Garg: I love you too',
'Love you ♥️♥️',
'12/20/22, 22:05 - Gautam Malhotra: Love you bum',
'Love you',
'12/25/22, 17:52 - Gautam Malhotra: Love you bum',
'12/25/22, 17:53 - Risha Garg: Love you',
'12/31/22, 19:14 - Gautam Malhotra: Love you this year as well lol',
'1/13/23, 14:17 - Gautam Malhotra: Love you, just saying it since it\'s been a while',
'1/13/23, 18:47 - Risha Garg: Love you',
'1/16/23, 13:37 - Gautam Malhotra: Love you bum, get some rest',
'1/16/23, 14:00 - Risha Garg: Love you',
'Love you lots ♥️',
'1/20/23, 21:37 - Gautam Malhotra: Love you',
'I love you too',
'1/23/23, 22:35 - Gautam Malhotra: Love you',
'Love you more',
'1/29/23, 12:19 - Gautam Malhotra: Enjoy the fest bum, love you as always',
'1/29/23, 12:22 - Risha Garg: I love you',
'1/30/23, 20:24 - Gautam Malhotra: Love you bum',
'1/31/23, 06:36 - Risha Garg: Love you',
'2/4/23, 11:37 - Gautam Malhotra: Love you bum',
'Love you',
'2/5/23, 05:17 - Gautam Malhotra: Goodnight bum, love you',
'2/8/23, 13:49 - Gautam Malhotra: Love you bum',
'2/8/23, 14:24 - Risha Garg: Love you',
'2/9/23, 23:35 - Risha Garg: Love you more',
'2/11/23, 13:00 - Gautam Malhotra: I love you dude ♥️',
'2/12/23, 01:40 - Gautam Malhotra: Love you',
'2/12/23, 11:09 - Risha Garg: Love you more',
'2/13/23, 13:32 - Gautam Malhotra: Love you bum ❤️',
'People love you bum',
'2/16/23, 07:57 - Gautam Malhotra: Love you more bum ❤️',
'I love you and call me when you read this',
'2/17/23, 06:13 - Gautam Malhotra: I love you so much',
'2/17/23, 21:01 - Gautam Malhotra: Love you ♥️',
'Love you more ♥️',
'2/20/23, 22:36 - Gautam Malhotra: I love you ♥️',
'2/22/23, 02:43 - Risha Garg: Love you so much',
'2/22/23, 07:01 - Gautam Malhotra: Love you more ♥️',
'2/24/23, 03:34 - Gautam Malhotra: Love you bum',
'2/24/23, 12:05 - Risha Garg: Love you more',
'Love you risha',
'2/25/23, 20:47 - Gautam Malhotra: Love you bum',
'Love you',
'Love you too',
'Love you',
'3/3/23, 15:16 - Risha Garg: Love you bum ♥️🫂',
'3/3/23, 15:19 - Gautam Malhotra: Love you bum ♥️',
'3/3/23, 22:13 - Gautam Malhotra: Love you ❤️',
'3/4/23, 08:38 - Risha Garg: Love you more',
'3/17/23, 20:41 - Risha Garg: I love you though',
'I love you',
'3/17/23, 23:20 - Gautam Malhotra: Love you ❤️',
'3/18/23, 20:59 - Gautam Malhotra: Love you bum',
'3/18/23, 20:59 - Risha Garg: love you more bum',
'3/19/23, 00:09 - Gautam Malhotra: I love you ♥️',
'I love you ♥️',
'3/23/23, 16:15 - Gautam Malhotra: I love you ❤️, keep an eye out for those flowers',
'3/23/23, 16:20 - Risha Garg: I love you more',
'3/23/23, 19:19 - Gautam Malhotra: I love you more',
'3/23/23, 22:05 - Gautam Malhotra: Love you ♥️',
'Love you 🦋',
'Love you bum',
'Love you more',
'Love you 🦋',
'Love you too',
'4/5/23, 11:46 - Risha Garg: love you',
'4/5/23, 12:49 - Gautam Malhotra: Love you too bum',
'4/6/23, 09:27 - Risha Garg: Love you more',
'4/12/23, 01:34 - Gautam Malhotra: Love you',
'4/12/23, 09:20 - Risha Garg: Love you',
'Love you',
'4/18/23, 00:27 - Gautam Malhotra: Love you too',
'4/19/23, 21:31 - Gautam Malhotra: Love you',
'Love you',
'Love you',
'4/23/23, 00:02 - Gautam Malhotra: Love you too bum',
'I love you so much',
'5/2/23, 20:52 - Gautam Malhotra: Love you, good luck for tomorrow',
'I love you and that won\'t change ever',
'5/2/23, 21:29 - Risha Garg: I love you more',
'5/3/23, 22:40 - Gautam Malhotra: Love you',
'Love you',
'5/3/23, 23:26 - Gautam Malhotra: Love you',
'Love you ♥️',
'',];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2500);
  });
  counter = (counter + Math.floor(Math.random() * 20) + 1) % phrases.length;
};

next();
