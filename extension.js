const vscode = require('vscode');
const path = require('path');
const player = require('play-sound')({});
/**Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=383749">Universfield</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=383749">Pixabay</a> */
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Dhakirni extension activated 🌿');
const playDhikrSound = () => {
	const config = vscode.workspace.getConfiguration('dhakirni');
	const soundEnabled = config.get('soundEnabled');

	if (!soundEnabled) return;

	const soundPath = path.join(
		context.extensionPath,
		'assets',
		'sounds',
		'dhikr.mp3'
	);

	player.play(soundPath, (err) => {
		if (err) {
			console.error('Dhakirni sound error:', err);
		}
	});
};

	const adhkar = [
		"سُبْحَانَ اللَّهِ",
		"الْحَمْدُ لِلَّهِ",
		"اللَّهُ أَكْبَرُ",
		"لَا إِلٰهَ إِلَّا اللَّهُ",
		"أَسْتَغْفِرُ اللَّهَ",
		"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
		"اللَّهُمَّ صَلِّ عَلَى سيدنا مُحَمَّدٍ",
		"رَبِّ اغْفِرْ لِي",
		"يَا حَيُّ يَا قَيُّومُ",
		"اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ"
	];

	let timer = null;

	const startReminder = () => {
		const config = vscode.workspace.getConfiguration('dhakirni');
		const enabled = config.get('enabled');
		const interval = config.get('intervalMinutes');

		if (!enabled) {
	if (timer) clearInterval(timer);
	return;
}


		if (timer) clearInterval(timer);

		timer = setInterval(() => {
			const dhikr = adhkar[Math.floor(Math.random() * adhkar.length)];
			vscode.window.showInformationMessage(`🌿 تذكير بالذكر: ${dhikr}`);
playDhikrSound();

		}, interval * 60 * 1000);
	};

	// Start on activation
	startReminder();

	// Restart if settings change
	vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('dhakirni')) {
			startReminder();
		}
	});

	// Manual trigger command
	const manualDhikr = vscode.commands.registerCommand('dhakirni.remindNow', () => {
		const dhikr = adhkar[Math.floor(Math.random() * adhkar.length)];
vscode.window.showInformationMessage(`🌿 تذكير بالذكر: ${dhikr}`);
playDhikrSound();

	});

	context.subscriptions.push(manualDhikr);
	context.subscriptions.push({ dispose: () => timer && clearInterval(timer) });
}

function deactivate() {
	console.log('Dhakirni extension deactivated');
}

module.exports = {
	activate,
	deactivate
};
