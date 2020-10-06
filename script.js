import WaveSurfer from "wavesurfer.js"
import sample from "./ursula.mp3"

const waveSurfer = WaveSurfer.create({
  container: "#wavesurfer-container",
  waveColor: "violet",
  progressColor: "purple",
})

const playBtn = document.querySelector("#play")
const stopBtn = document.querySelector("#stop")
playBtn.onclick = () => waveSurfer.play()
stopBtn.onclick = () => waveSurfer.stop()

waveSurfer.load(sample)
