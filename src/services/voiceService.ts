interface VoiceOptions {
  language?: string
  rate?: number
  pitch?: number
  volume?: number
}

interface RecognitionResult {
  transcript: string
  confidence: number
  isFinal: boolean
}

class VoiceService {
  private recognition: any
  private synthesis: SpeechSynthesis
  private isListening: boolean = false
  private onResultCallback: ((result: RecognitionResult) => void) | null = null

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.setupRecognition()
    }
    this.synthesis = window.speechSynthesis
  }

  private setupRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = 'en-US'

    this.recognition.onstart = () => {
      this.isListening = true
    }

    this.recognition.onend = () => {
      this.isListening = false
    }

    this.recognition.onresult = (event: any) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        const confidence = event.results[i][0].confidence

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }

        if (this.onResultCallback) {
          this.onResultCallback({
            transcript: finalTranscript || interimTranscript,
            confidence,
            isFinal: event.results[i].isFinal,
          })
        }
      }
    }

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
    }
  }

  async speak(text: string, options: VoiceOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = options.rate || 1
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 1
      utterance.lang = options.language || 'en-US'

      utterance.onend = () => resolve()
      utterance.onerror = (event) => reject(event.error)

      this.synthesis.speak(utterance)
    })
  }

  startListening(onResult: (result: RecognitionResult) => void): void {
    if (!this.recognition) {
      console.error('Speech recognition not supported')
      return
    }
    this.onResultCallback = onResult
    this.recognition.start()
  }

  stopListening(): void {
    if (!this.recognition) return
    this.recognition.abort()
    this.isListening = false
  }

  getIsListening(): boolean {
    return this.isListening
  }

  cancelSpeech(): void {
    this.synthesis.cancel()
  }

  isSpeechRecognitionSupported(): boolean {
    return !!this.recognition
  }

  isSpeechSynthesisSupported(): boolean {
    return !!this.synthesis
  }
}

export default new VoiceService()
export type { VoiceOptions, RecognitionResult }
