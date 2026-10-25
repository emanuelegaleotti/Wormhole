# Lorentz event bus

Library for the communication between micro frontends. Messages travel on a browser `CustomEvent` named `lorentz-event-bus` dispatched on `window`, so micro frontends bundled and deployed separately can talk to each other without sharing any instance.

`LorentzEventBusService` needs the `ngx-webstorage` providers (`provideNgxWebstorage(withLocalStorage(), withSessionStorage())`), used by the storage based variants of the bus.

## Usage

```ts
import { ALL, EventMessage, LorentzEventBusService } from 'lorentz-event-bus'

const bus = inject(LorentzEventBusService)

// send to a single recipient...
bus.sendEventBusMessage(new EventMessage('1986', 'Hello from 2019', '2019'))
// ...or to everybody
bus.sendEventBusMessage(new EventMessage(ALL, 'Hello timelines', '2019'))

// receive what is addressed to this recipient (or broadcast)
bus.listen('1986').pipe(takeUntilDestroyed()).subscribe(m => console.log(m.from, m.message))
```

`EventMessage` has `to` (an `EventAddress`: `ALL` or a recipient string), `message`, an optional `from` and a `type`, `application` by default:

- `user`: authentication and authorization;
- `service`: bus housekeeping, no application data;
- `application`: application data.

`announcePresence(from)` broadcasts a `service` message with `PRESENCE_MESSAGE` to everybody: a micro frontend calls it as soon as it connects to the bus, so the others know it is available.

The home of Wormhole shows the bus at work: the `timeline-1953`, `timeline-1986` and `timeline-2019` micro frontends simulate a chat between the three timelines of Dark, passing every message through the bus.

## Loading a micro frontend

`SetComponentDirective` (`[lorentzSetComponent]`) loads a component exposed as `./Component` by a Module Federation remote and renders it next to the anchor. Use it on an `ng-container` so no extra element is rendered:

```html
<ng-container [lorentzSetComponent]="'WeatherComponent'"
              [remoteUrl]="'http://localhost:3300/weatherEntry.js'"
              [remoteName]="'weather'"></ng-container>
```

## Build and test

```
ng build lorentz-event-bus   # output in dist/lorentz-event-bus, used by the other projects through the tsconfig path
ng test lorentz-event-bus
```
