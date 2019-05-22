import copy from 'clipboard-copy';
import App from './App.svelte';
import words from '../output.txt';

import 'spectre.css';

const emojiHash = {
	"id": "🆔",
	"a": "🅰️",
	"b": "🅱️",
	"ab": "🆎",
	"cl": "🆑",
	"o": "🅾️",
	"sos": "🆘",
	"x": "❎",
	"m": "Ⓜ️",
	"atm": "🏧",
	"wc": "🚾",
	"p": "🅿️",
	"i": "ℹ️",
	"abc": "🔤",
	"ng": "🆖",
	"ok": "🆗",
	"up": "🆙",
	"cool": "🆒",
	"new": "🆕",
	"free": "🆓",
	"tm": "™️",
	"c": "©️",
	"r": "®️",
	"end": "🔚",
	"back": "🔙",
	"on": "🔛",
	"top": "🔝",
	"soon": "🔜"
};

const sortedKeys = Object.keys(emojiHash).sort((a,b) => b.length - a.length);
const regexKeys = sortedKeys.map(key => new RegExp(key, 'g'));

const convertToEmoji = (word) => {
	let emojified = String(word);
	regexKeys.forEach((key, i) => emojified = emojified.replace(key, emojiHash[sortedKeys[i]]));
	return emojified;
}

function emojify(word) {
	let emojified = String(word);
	do {
		emojified = convertToEmoji(emojified);
	} while (emojified.split('').some(e => /^[a-zA-Z]+$/.test(e)));
	return emojified;
};

const app = new App({
	target: document.body,
	props: {
		copy,
		emoji: Object.values(emojiHash),
		sort: 'default',
		words: words.split('\n').map(emojify)
	}
});

window.app = app;

export default app;