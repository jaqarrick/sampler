import WaveSurfer from "wavesurfer.js"
// import sample from "./ursula.mp3"
import sample from "./garoto.mp3"
import RegionsPlugin from "./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions"
import * as Tone from "tone"

let allSamples = []


const waveSurfer = WaveSurfer.create({
	container: "#wavesurfer-container",
	waveColor: "violet",
	progressColor: "purple",
	backend: "MediaElementWebAudio",
	plugins: [
		RegionsPlugin.create({
			regionsMinLength: 0,
			regions: [],
			dragSelection: {
				slop: 1,
			},
		}),
	],
})

waveSurfer.load(sample)

document.querySelector('#slider').oninput = function () {
	waveSurfer.zoom(Number(this.value));
};





// Creates a mediastream for mediaRecorder
const streamDestination = waveSurfer.backend.ac.createMediaStreamDestination()

// Creates a gainNode to use as a wavesurfer filter (just needs to be something for the audio to pass through)
const gainNode = waveSurfer.backend.ac.createGain()

// Connects gain node to the audio stream
gainNode.connect(streamDestination)

waveSurfer.backend.setFilter(gainNode)



// Sets up media recorder
const mediaRecorder = new MediaRecorder(streamDestination.stream)


const startRecBtn = document.getElementById("start-recording")
const stopRecBtn = document.getElementById("stop-recording")
startRecBtn.onclick = () => startRecording()
stopRecBtn.onclick = () => stopRecording()
document.body.addEventListener("keydown", e => {
	if(e.keycode == 32){startRecording()}})
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

var audio = document.getElementById("audio")
const sampleContainer = document.querySelector("#sample-container")
function renderSamples(){
	allSamples.forEach(dataElement => {
		//make audio object
		const audioElement = document.createElement('audio')
		audioElement.src = URL.createObjectURL(dataElement)
		audioElement.setAttribute("controls", true)
		sampleContainer.appendChild(audioElement)

		//make recording link
		let recordedChunks = []
		if(dataElement.size > 0){
			recordedChunks.push(dataElement)
			download(recordedChunks)
		}
	})
}


function createNewSample(data) {
	//add data to array
	allSamples.push(data)
	//render all recordings function
	renderSamples()


}
const onRecordingReady = e => createNewSample(e.data)

// This triggers when the file is ready for playback
mediaRecorder.addEventListener("dataavailable", onRecordingReady)

function download(recordedChunks) {
  var blob = new Blob(recordedChunks, {
    type: "audio/wav; codecs=MS_PCM"
  });
  var url = URL.createObjectURL(blob);
	var a = document.createElement("a");
	
  sampleContainer.appendChild(a);
	a.innerText = 'Download Sample'
  a.href = url;
  a.download = "sample.wav";
  // window.URL.revokeObjectURL(url);
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
