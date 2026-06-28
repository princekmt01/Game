let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = "sine") {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.08;

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  oscillator.stop(ctx.currentTime + duration);
}

export function playCorrectSound() {
  playTone(880, 0.12, "sine");
  setTimeout(() => playTone(1174, 0.1, "sine"), 80);
}

export function playWrongSound() {
  playTone(220, 0.18, "square");
}

export function playTickSound() {
  playTone(660, 0.05, "triangle");
}
