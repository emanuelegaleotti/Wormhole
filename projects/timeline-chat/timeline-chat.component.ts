import { DatePipe } from '@angular/common'
import { afterRenderEffect, Component, computed, DestroyRef, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { filter } from 'rxjs'
import { EventMessage, LorentzEventBusService, PRESENCE_MESSAGE } from 'lorentz-event-bus'
import { ChatMessage, Timeline, TIMELINES } from './timeline-chat.model'

// One side of the chat between the timelines: everything it says and hears goes through the Lorentz event bus.
@Component({
  selector: 'app-timeline-chat',
  templateUrl: './timeline-chat.component.html',
  styleUrls: ['./timeline-chat.component.scss'],
  imports: [DatePipe]
})
export class TimelineChatComponent implements OnInit {
  private readonly bus = inject(LorentzEventBusService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly log = viewChild<ElementRef<HTMLElement>>('log')
  private nextId = 0

  readonly timeline = input.required<Timeline>()

  readonly messages = signal<ChatMessage[]>([])
  readonly draft = signal('')
  readonly recipient = signal('all')
  readonly recipients = computed(() => TIMELINES.filter(year => year !== this.timeline().year))

  constructor () {
    afterRenderEffect(() => {
      this.messages()
      const log = this.log()?.nativeElement
      log?.scrollTo({ top: log.scrollHeight })
    })
  }

  ngOnInit (): void {
    const own = this.timeline().year
    this.bus.listen(own).pipe(
      filter(m => m.from !== undefined && m.from !== own && (TIMELINES as readonly string[]).includes(m.from)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(m => this.add({
      from: m.from as string,
      to: m.to,
      text: m.message,
      presence: m.message === PRESENCE_MESSAGE
    }))
    this.bus.announcePresence(own)
  }

  setRecipient (event: Event): void {
    this.recipient.set((event.target as HTMLSelectElement).value)
  }

  setDraft (event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value)
  }

  send (event: Event): void {
    event.preventDefault()
    const text = this.draft().trim()
    if (text) {
      this.bus.sendEventBusMessage(new EventMessage(this.recipient(), text, this.timeline().year))
      this.draft.set('')
    }
  }

  private add (m: Omit<ChatMessage, 'id' | 'at'>): void {
    this.messages.update(list => [...list, { ...m, id: this.nextId++, at: new Date() }])
  }
}
