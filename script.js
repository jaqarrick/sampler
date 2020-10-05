import WaveSurfer from "wavesurfer.js"

const waveSurfer = WaveSurfer.create({
  container: "#wavesurfer-container",
  waveColor: "violet",
  progressColor: "purple",
})

const playBtn = document.querySelector("#play")
const stopBtn = document.querySelector("#stop")
playBtn.onclick = () => waveSurfer.play()
stopBtn.onclick = () => waveSurfer.stop()

waveSurfer.load(
  "https://res.cloudinary.com/dcttcffbc/video/upload/v1597046397/samples/react-sequencer/crash.mp3"
)
