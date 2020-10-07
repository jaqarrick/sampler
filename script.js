import WaveSurfer from "wavesurfer.js"
import sample from "./ursula.mp3"
import RegionsPlugin from "./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions"
const waveSurfer = WaveSurfer.create({
  container: "#wavesurfer-container",
  waveColor: "violet",
  progressColor: "purple",
  plugins: [
    RegionsPlugin.create({
      regionsMinLength: 1,
      regions: [
        {
          start: 1,
          end: 9,
          loop: true,
          color: "hsla(400, 100%, 30%, 0.5)",
        },
      ],
      dragSelection: {
        slop: 1,
      },
    }),
  ],
})

const playBtn = document.querySelector("#play")
const stopBtn = document.querySelector("#stop")
playBtn.onclick = () => waveSurfer.play()
stopBtn.onclick = () => waveSurfer.stop()

waveSurfer.load(sample)
