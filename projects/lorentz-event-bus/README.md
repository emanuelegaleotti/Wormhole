# Lorentz event bus

Library for the communication between micro frontends. Messages travel on a browser `CustomEvent` named `lorentz-event-bus` dispatched on `window`, so micro frontends bundled and deployed separately can talk to each other without sharing any instance.

`LorentzEventBusService` needs the `ngx-webstorage` providers (`provideNgxWebstorage(withLocalStorage(), withSessionStorage())`), used by the storage based variants of the bus.

## Usage

```ts
import { EventMessage, LorentzEventBusService } from 'lorentz-event-bus'

const bus = inject(LorentzEventBusService)

// send to a single recipient...
bus.sendEventBusMessage(new EventMessage('1986', 'Hello from 2019', '2019'))
// ...or to everybody
bus.sendEventBusMessage(new EventMessage('all', 'Hello timelines', '2019'))

// receive what is addressed to this recipient (or broadcast)
bus.listen('1986').pipe(takeUntilDestroyed()).subscribe(m => console.log(m.from, m.message))
```

`EventMessage` has `to` (recipient or `all`), `message` and an optional `from`.

`announcePresence(from)` broadcasts a `PRESENCE_MESSAGE` to everybody: a micro frontend calls it as soon as it connects to the bus, so the others know it is available.

`sendSessionBusMessage` / `sendLocalBusMessage` persist the last message in `sessionStorage` / `localStorage`.

The home of Wormhole shows the bus at work: the `timeline-1953`, `timeline-1986` and `timeline-2019` micro frontends simulate a chat between the three timelines of Dark, passing every message through the bus.

## Build and test

```
ng build lorentz-event-bus   # output in dist/lorentz-event-bus, used by the other projects through the tsconfig path
ng test lorentz-event-bus
```
