import WaveSurfer from "wavesurfer.js"
import sample from "./ursula.mp3"
import RegionsPlugin from "./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions"
import * as Tone from 'tone'


  const waveSurfer = WaveSurfer.create({
    container: "#wavesurfer-container",
    waveColor: "violet",
    progressColor: "purple",
    backend: 'MediaElementWebAudio',
    plugins: [
      RegionsPlugin.create({
        regionsMinLength: 1,
        regions: [
          
        ],
        dragSelection: {
          slop: 1,
        },
      }),
    ],
  })




async function setup() {
  await new Promise(res => {
    res(waveSurfer.load(sample))
  })
  console.log(waveSurfer.backend.ac)
}
setup()
const synth = new Tone.Synth().toDestination()
const startAudio = document.querySelector('#start-audio')
startAudio.addEventListener('click',() => {
  Tone.start()
  synth.triggerAttackRelease('c4', '4n')
})


waveSurfer.panner = waveSurfer.backend.ac.createStereoPanner()
waveSurfer.backend.setFilter(waveSurfer.panner)







const record = () => {
  setTimeout(async() => {
    const recording = await recorder.stop()
    const url = URL.createObjectURL(recording)
  }, timeout);
}


const region1 = waveSurfer.addRegion({
  start: 1,
  end: 9,
  loop: false,
  color: "hsla(400, 100%, 30%, 0.5)"
})


const playBtn = document.querySelector("#play")
const stopBtn = document.querySelector("#stop")
playBtn.onclick = () => waveSurfer.play(region1.start, region1.end)
stopBtn.onclick = () => waveSurfer.stop()


