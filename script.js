import WaveSurfer from "wavesurfer.js"
import sample from "./ursula.mp3"
import RegionsPlugin from "./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions"
import * as Tone from "tone"

const waveSurfer = WaveSurfer.create({
	container: "#wavesurfer-container",
	waveColor: "violet",
	progressColor: "purple",
	backend: "MediaElementWebAudio",
	plugins: [
		RegionsPlugin.create({
			regionsMinLength: 1,
			regions: [],
			dragSelection: {
				slop: 1,
			},
		}),
	],
})

waveSurfer.load(sample)

// Creates a mediastream for mediaRecorder
const streamDestination = waveSurfer.backend.ac.createMediaStreamDestination()

// Creates a gainNode to use as a wavesurfer filter (just needs to be something for the audio to pass through)
const gainNode = waveSurfer.backend.ac.createGain()

// Connects gain node to the audio stream
gainNode.connect(streamDestination)

waveSurfer.backend.setFilter(gainNode)

// Sets up media recorder
const mediaRecorder = new MediaRecorder(streamDestination.stream)

// This triggers when the file is ready for playback
mediaRecorder.addEventListener("dataavailable", onRecordingReady)

const startRecBtn = document.getElementById("start-recording")
const stopRecBtn = document.getElementById("stop-recording")
startRecBtn.onclick = () => startRecording()
stopRecBtn.onclick = () => stopRecording()

function stopRecording() {
	console.log("recording stopped")
	// Stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
	mediaRecorder.stop()
}
function startRecording() {
	console.log("recording started")
	//Starts playing the sample
	waveSurfer.play(region1.start, region1.end)
	//Determines the length of the sample and stops the recorder after the sample has finished playing
	const duration = region1.end - region1.start
	mediaRecorder.start()
	setTimeout(stopRecording, duration * 1000)
}

function onRecordingReady(e) {
	var audio = document.getElementById("audio")
	// e.data contains a blob representing the recording
	audio.src = URL.createObjectURL(e.data)
	audio.play()
}

const region1 = waveSurfer.addRegion({
	start: 1,
	end: 9,
	loop: false,
	color: "hsla(400, 100%, 30%, 0.5)",
})

const playBtn = document.querySelector("#play")
const stopBtn = document.querySelector("#stop")
playBtn.onclick = () => {
	waveSurfer.play(region1.start, region1.end)
}
stopBtn.onclick = () => waveSurfer.stop()
