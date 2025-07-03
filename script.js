// ===== BIRTHDAY WEBSITE FOR SISTER =====
// Enhanced with funny sounds and beautiful sister-themed content

// ===== CONFIGURATION VARIABLES =====
const CONFIG = {
  sisterName: "Sister", // CHANGE THIS to your sister's actual name
  confettiCount: 60, // More confetti for sister!
  confettiColors: ["#ff6b9d", "#c7ceea", "#b8f2e6", "#ffd3a5", "#ff8a80", "#ffd93d", "#e91e63", "#9c27b0"],
  sparkleCount: 30,
  cakeShowDuration: 7000, // Longer for sister
  enableSounds: true,
  enableBackgroundMusic: true,
}

// Sister-specific surprise messages
const SISTER_SURPRISE_MESSAGES = [
  "👸 You're the best sister ever! 👸",
  "💖 Sister, you're absolutely amazing! 💖",
  "🌟 You light up everyone's life! 🌟",
  "💕 So grateful to have you as my sister! 💕",
  "🎈 You deserve all the happiness! 🎈",
  "✨ Sister power is the best power! ✨",
  "🌈 You make life more colorful! 🌈",
  "🎊 Party time with the coolest sister! 🎊",
  "🌸 Beautiful inside and out, sister! 🌸",
  "🎁 You're the greatest gift to our family! 🎁",
  "😄 You always make me laugh! 😄",
  "🤗 Best sister hugs coming your way! 🤗",
]

// Funny sound effects data (we'll generate these)
const FUNNY_SOUNDS = [
  { type: "boing", description: "Boing boing!" },
  { type: "whistle", description: "Wheeee!" },
  { type: "pop", description: "Pop pop pop!" },
  { type: "giggle", description: "Hehe!" },
  { type: "tada", description: "Ta-da!" },
  { type: "silly", description: "Silly sound!" },
]

// ===== GLOBAL VARIABLES =====
let musicPlaying = false
let celebrationCount = 0
let audioContext = null
let musicStarted = false
let currentFunnySoundIndex = 0

// ===== DOM ELEMENTS =====
const elements = {
  celebrateBtn: document.getElementById("celebrateBtn"),
  confettiContainer: document.getElementById("confetti"),
  cakeContainer: document.getElementById("cakeContainer"),
  birthdayChime: document.getElementById("birthdayChime"),
  backgroundMusic: document.getElementById("backgroundMusic"),
  musicBtn: document.getElementById("musicBtn"),
  muteBtn: document.getElementById("muteBtn"),
  birthdayTitle: document.getElementById("birthdayTitle"),
  musicPrompt: document.getElementById("musicPrompt"),
  startCelebration: document.getElementById("startCelebration"),
  surpriseMessages: document.getElementById("surpriseMessages"),
  messageBubble: document.getElementById("messageBubble"),
  messageContent: document.getElementById("messageContent"),
  wishText: document.getElementById("wishText"),
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎉 Sister's birthday website loaded!")
  initializeWebsite()
  setupEventListeners()
})

function initializeWebsite() {
  // Update title with sister's name if different from default
  if (CONFIG.sisterName !== "Sister") {
    elements.birthdayTitle.textContent = `Happy Birthday Beautiful ${CONFIG.sisterName}! 💕`
  }

  setupAudio()
  showMusicPrompt()
  rotateSisterWishes()
}

function setupAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  } catch (e) {
    console.log("Web Audio API not supported")
  }

  // Set up background music
  if (elements.backgroundMusic) {
    elements.backgroundMusic.volume = 0.4 // Slightly louder for the MP3
    elements.backgroundMusic.loop = true
    elements.backgroundMusic.preload = "auto"

    // Add event listeners for the MP3 file
    elements.backgroundMusic.addEventListener("loadeddata", () => {
      console.log("Background music loaded successfully!")
    })

    elements.backgroundMusic.addEventListener("error", (e) => {
      console.log("Error loading background music:", e)
    })
  }
}

function setupEventListeners() {
  if (elements.celebrateBtn) {
    elements.celebrateBtn.addEventListener("click", handleCelebrationClick)
  }

  if (elements.musicBtn) {
    elements.musicBtn.addEventListener("click", toggleBackgroundMusic)
  }

  if (elements.muteBtn) {
    elements.muteBtn.addEventListener("click", toggleBackgroundMusic)
  }

  if (elements.startCelebration) {
    elements.startCelebration.addEventListener("click", startCelebrationWithMusic)
  }

  document.addEventListener("keydown", handleKeyboardShortcuts)

  if (elements.celebrateBtn) {
    elements.celebrateBtn.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-2px) scale(1.02)"
    })

    elements.celebrateBtn.addEventListener("touchend", function () {
      this.style.transform = ""
    })
  }
}

function startInitialAnimations() {
  if (elements.birthdayTitle) {
    elements.birthdayTitle.style.opacity = "0"
    elements.birthdayTitle.style.transform = "translateY(-50px)"

    setTimeout(() => {
      elements.birthdayTitle.style.transition = "all 1s ease-out"
      elements.birthdayTitle.style.opacity = "1"
      elements.birthdayTitle.style.transform = "translateY(0)"
    }, 500)
  }

  const polaroids = document.querySelectorAll(".polaroid")
  polaroids.forEach((polaroid, index) => {
    polaroid.style.opacity = "0"
    polaroid.style.transform = "translateY(50px) rotate(0deg)"

    setTimeout(
      () => {
        polaroid.style.transition = "all 0.8s ease-out"
        polaroid.style.opacity = "1"
        const rotation = index % 2 === 0 ? `${-8 + index * 3}deg` : `${5 - index * 2}deg`
        polaroid.style.transform = `translateY(0) rotate(${rotation})`
      },
      1000 + index * 300,
    )
  })
}

// ===== CELEBRATION FUNCTIONS =====

function handleCelebrationClick() {
  celebrationCount++

  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume()
  }

  // Play funny sound
  playFunnySound()

  // Create extra confetti for sister
  createConfettiBurst(CONFIG.confettiCount)
  createSparkles(elements.celebrateBtn)
  showCakeAnimation()
  showSurpriseMessage()
  updateButtonText()
  addScreenShake()

  // Add extra sparkle effect for sister
  createExtraSparkles()

  console.log(`🎉 Sister celebration #${celebrationCount}!`)
}

function createConfettiBurst(count) {
  if (!elements.confettiContainer) return

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createConfettiPiece()
    }, i * 40) // Faster for more dramatic effect
  }
}

function createConfettiPiece() {
  const confetti = document.createElement("div")
  confetti.className = "confetti"

  const color = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)]
  const startX = Math.random() * window.innerWidth
  const rotation = Math.random() * 360
  const scale = 0.6 + Math.random() * 0.8 // Bigger confetti
  const duration = 2.5 + Math.random() * 2

  confetti.style.backgroundColor = color
  confetti.style.left = startX + "px"
  confetti.style.transform = `rotate(${rotation}deg) scale(${scale})`
  confetti.style.animationDuration = duration + "s"

  elements.confettiContainer.appendChild(confetti)

  setTimeout(() => {
    if (confetti.parentNode) {
      confetti.parentNode.removeChild(confetti)
    }
  }, duration * 1000)
}

function createSparkles(targetElement) {
  const rect = targetElement.getBoundingClientRect()

  for (let i = 0; i < CONFIG.sparkleCount; i++) {
    setTimeout(() => {
      createSparkle(rect)
    }, i * 80)
  }
}

function createSparkle(rect) {
  const sparkle = document.createElement("div")
  sparkle.className = "sparkle"

  const x = rect.left + Math.random() * rect.width
  const y = rect.top + Math.random() * rect.height

  sparkle.style.left = x + "px"
  sparkle.style.top = y + "px"
  sparkle.style.position = "fixed"
  sparkle.style.zIndex = "1001"

  document.body.appendChild(sparkle)

  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.parentNode.removeChild(sparkle)
    }
  }, 2000) // Longer sparkle duration
}

function createExtraSparkles() {
  // Create sparkles all around the screen for sister
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"
      sparkle.style.position = "fixed"
      sparkle.style.left = Math.random() * window.innerWidth + "px"
      sparkle.style.top = Math.random() * window.innerHeight + "px"
      sparkle.style.zIndex = "1001"
      document.body.appendChild(sparkle)

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle)
        }
      }, 2000)
    }, i * 100)
  }
}

function showCakeAnimation() {
  if (!elements.cakeContainer) return

  elements.cakeContainer.classList.add("show")

  setTimeout(() => {
    elements.cakeContainer.classList.remove("show")
  }, CONFIG.cakeShowDuration)
}

function updateButtonText() {
  if (!elements.celebrateBtn) return

  const messages = [
    "🎁 Click for a Funny Surprise! 🎁",
    "😄 That was hilarious! Click again! 😄",
    "🤣 Keep the laughs coming! 🤣",
    "🎈 You're the funniest sister! 🎈",
    "😂 One more funny moment! 😂",
    "🎊 Sister comedy show! 🎊",
    "💖 You make me smile! 💖",
    "🌈 More sister magic! 🌈",
  ]

  const messageIndex = Math.min(celebrationCount, messages.length - 1)
  const buttonText = elements.celebrateBtn.querySelector(".button-text")
  if (buttonText) {
    buttonText.textContent = messages[messageIndex]
  }
}

function addScreenShake() {
  document.body.style.animation = "none"
  document.body.offsetHeight
  document.body.style.animation = "shake 0.6s ease-in-out" // Slightly longer shake

  setTimeout(() => {
    document.body.style.animation = ""
  }, 600)
}

// ===== FUNNY AUDIO FUNCTIONS =====

function playFunnySound() {
  if (!CONFIG.enableSounds || !audioContext) return

  const soundType = FUNNY_SOUNDS[currentFunnySoundIndex % FUNNY_SOUNDS.length]
  currentFunnySoundIndex++

  try {
    switch (soundType.type) {
      case "boing":
        playBoingSound()
        break
      case "whistle":
        playWhistleSound()
        break
      case "pop":
        playPopSound()
        break
      case "giggle":
        playGiggleSound()
        break
      case "tada":
        playTadaSound()
        break
      case "silly":
        playSillySound()
        break
      default:
        playBoingSound()
    }
  } catch (error) {
    console.log("Could not play funny sound:", error)
  }
}

function playBoingSound() {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  // Create boing effect
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3)
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5)

  gainNode.gain.setValueAtTime(0.4, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}

function playWhistleSound() {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  // Create whistle effect
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
  oscillator.frequency.linearRampToValueAtTime(2000, audioContext.currentTime + 0.8)

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.8)
}

function playPopSound() {
  // Create multiple quick pops
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(600 + i * 200, audioContext.currentTime)
      oscillator.type = "square"

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }, i * 100)
  }
}

function playGiggleSound() {
  // Create giggle-like sound
  const frequencies = [400, 500, 450, 550, 480]
  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    }, index * 80)
  })
}

function playTadaSound() {
  // Create triumphant ta-da sound
  const oscillator1 = audioContext.createOscillator()
  const oscillator2 = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator1.connect(gainNode)
  oscillator2.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator1.frequency.setValueAtTime(523, audioContext.currentTime) // C5
  oscillator2.frequency.setValueAtTime(659, audioContext.currentTime) // E5

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0)

  oscillator1.start(audioContext.currentTime)
  oscillator2.start(audioContext.currentTime)
  oscillator1.stop(audioContext.currentTime + 1.0)
  oscillator2.stop(audioContext.currentTime + 1.0)
}

function playSillySound() {
  // Create silly wobble sound
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(300, audioContext.currentTime)

  // Create wobble effect
  for (let i = 0; i < 10; i++) {
    const time = audioContext.currentTime + i * 0.05
    const freq = 300 + Math.sin(i) * 100
    oscillator.frequency.setValueAtTime(freq, time)
  }

  gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}

// ===== BACKGROUND MUSIC FUNCTIONS =====

function toggleBackgroundMusic() {
  if (!CONFIG.enableBackgroundMusic) return

  if (musicPlaying) {
    stopBackgroundMusic()
  } else {
    startBackgroundMusic()
  }
}

function startBackgroundMusic() {
  if (elements.backgroundMusic) {
    const playPromise = elements.backgroundMusic.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          musicPlaying = true
          updateMusicControls()
          console.log("Background music started successfully!")
        })
        .catch((e) => {
          console.log("Could not play background music:", e)
          // You might want to show a message to the user here
        })
    }
  }
}

function stopBackgroundMusic() {
  if (elements.backgroundMusic) {
    elements.backgroundMusic.pause()
  }
  musicPlaying = false
  updateMusicControls()
}

function updateMusicControls() {
  if (musicPlaying) {
    elements.musicBtn.style.display = "none"
    elements.muteBtn.style.display = "inline-flex"
    elements.muteBtn.classList.add("active")
  } else {
    elements.musicBtn.style.display = "inline-flex"
    elements.muteBtn.style.display = "none"
    elements.musicBtn.classList.remove("active")
  }
}

// ===== MUSIC PROMPT FUNCTIONS =====

function showMusicPrompt() {
  if (elements.musicPrompt) {
    elements.musicPrompt.style.display = "flex"
  }
}

function startCelebrationWithMusic() {
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume()
  }

  if (elements.musicPrompt) {
    elements.musicPrompt.style.opacity = "0"
    setTimeout(() => {
      elements.musicPrompt.style.display = "none"
    }, 500)
  }

  startBackgroundMusic()
  startInitialAnimations()

  setTimeout(() => {
    createConfettiBurst(40) // Extra confetti for sister
  }, 1000)

  musicStarted = true
}

// ===== OTHER FUNCTIONS =====

function showSurpriseMessage() {
  if (!elements.messageBubble || !elements.messageContent) return

  const randomMessage = SISTER_SURPRISE_MESSAGES[Math.floor(Math.random() * SISTER_SURPRISE_MESSAGES.length)]
  elements.messageContent.textContent = randomMessage

  elements.messageBubble.classList.add("show")

  setTimeout(() => {
    elements.messageBubble.classList.remove("show")
  }, 4000) // Longer display for sister messages
}

function rotateSisterWishes() {
  if (!elements.wishText) return

  const sisterWishes = [
    "To my wonderful sister: You bring so much joy, laughter, and love into this world. May your birthday be filled with all your favorite things and surrounded by everyone who loves you! 💖",
    "Dear sister, you're not just family, you're my best friend! Hope your special day is as amazing and beautiful as you are! 🌟",
    "Happy birthday to the most incredible sister! Thank you for all the memories, laughs, and for always being there. You deserve the world! ✨",
    "Sister, you light up every room you enter! May this new year bring you endless happiness, adventure, and all your dreams coming true! 🎈",
    "To my amazing sister: You're strong, beautiful, funny, and absolutely wonderful. Hope your birthday is filled with love, cake, and everything that makes you smile! 💕",
  ]

  let currentWish = 0

  setInterval(() => {
    elements.wishText.style.opacity = "0"
    setTimeout(() => {
      currentWish = (currentWish + 1) % sisterWishes.length
      elements.wishText.textContent = sisterWishes[currentWish]
      elements.wishText.style.opacity = "1"
    }, 500)
  }, 10000) // Slower rotation for longer messages
}

function handleKeyboardShortcuts(event) {
  switch (event.key.toLowerCase()) {
    case " ":
    case "enter":
      event.preventDefault()
      if (musicStarted) {
        handleCelebrationClick()
      } else {
        startCelebrationWithMusic()
      }
      break
    case "m":
      toggleBackgroundMusic()
      break
    case "c":
      createConfettiBurst(25)
      break
    case "s": // S for Sister!
      showSurpriseMessage()
      break
  }
}

// Add shake animation
const shakeStyle = document.createElement("style")
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-8px); }
        20% { transform: translateX(8px); }
        30% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        50% { transform: translateX(-4px); }
        60% { transform: translateX(4px); }
        70% { transform: translateX(-2px); }
        80% { transform: translateX(2px); }
        90% { transform: translateX(-1px); }
    }
`
document.head.appendChild(shakeStyle)

window.addEventListener("error", (event) => {
  console.error("JavaScript error:", event.error)
})

console.log("🎂 Sister's birthday website script loaded successfully!")
