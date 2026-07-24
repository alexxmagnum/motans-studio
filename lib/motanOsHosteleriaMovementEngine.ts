/**
 * MotanOS Hostelería — Movement Engine (FASE 6/7 normativa).
 * Lógica pura: cola, estados persistentes, tiempos, incompatibilidades.
 */

export type ChoreographyEventId =
  | "A01"
  | "A02"
  | "A03"
  | "A04"
  | "A05"
  | "B01"
  | "B02"
  | "B03"
  | "C01"
  | "C02"
  | "D01"
  | "D02"
  | "D03";

export type MesaId = "mesaA" | "mesaB" | "mesaC";

export type MesaState =
  | "libre"
  | "preparandose"
  | "reservada"
  | "ocupada"
  | "sirviendo"
  | "terminando"
  | "recogiendo";

export type BarraState = "tranquila" | "preparando" | "recogiendo";
export type PassState = "quieto" | "cruce";
export type CocinaState = "espera" | "respira";
export type EntradaState = "cerrada" | "entreabierta" | "cruce";

export type MovementPhase = "silence" | "breathing" | "event";

export type SceneState = {
  mesaA: MesaState;
  mesaB: MesaState;
  mesaC: MesaState;
  barra: BarraState;
  pass: PassState;
  cocina: CocinaState;
  entrada: EntradaState;
};

export type MovementSnapshot = {
  phase: MovementPhase;
  activeEvent: ChoreographyEventId | null;
  state: SceneState;
};

const EVENT_DURATION_MS: Record<ChoreographyEventId, number> = {
  A01: 12_000,
  A02: 14_000,
  A03: 10_000,
  A04: 11_000,
  A05: 13_000,
  B01: 9_000,
  B02: 8_000,
  B03: 9_000,
  C01: 6_000,
  C02: 7_000,
  D01: 8_000,
  D02: 10_000,
  D03: 10_000,
};

const HUMAN_EVENTS = new Set<ChoreographyEventId>(["B01", "B02", "B03", "C02", "D02", "D03"]);

const INCOMPATIBLE_PAIRS: ReadonlyArray<readonly [ChoreographyEventId, ChoreographyEventId]> = [
  ["B02", "B03"],
  ["C01", "C02"],
  ["D02", "D03"],
  ["A02", "A03"],
];

const ALL_EVENTS: readonly ChoreographyEventId[] = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "B01",
  "B02",
  "B03",
  "C01",
  "C02",
  "D01",
  "D02",
  "D03",
];

export function createInitialSceneState(): SceneState {
  return {
    mesaA: "recogiendo",
    mesaB: "preparandose",
    mesaC: "sirviendo",
    barra: "recogiendo",
    pass: "quieto",
    cocina: "respira",
    entrada: "entreabierta",
  };
}

function randomBetween(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function mesaStates(state: SceneState): MesaState[] {
  return [state.mesaA, state.mesaB, state.mesaC];
}

function mesaIdForState(state: SceneState, target: MesaState): MesaId | null {
  if (state.mesaA === target) return "mesaA";
  if (state.mesaB === target) return "mesaB";
  if (state.mesaC === target) return "mesaC";
  return null;
}

function firstMesaIn(state: SceneState, ...candidates: MesaState[]): MesaId | null {
  for (const candidate of candidates) {
    const id = mesaIdForState(state, candidate);
    if (id) return id;
  }
  return null;
}

export function getEventTargetMesa(event: ChoreographyEventId, state: SceneState): MesaId | null {
  switch (event) {
    case "A01":
      return firstMesaIn(state, "preparandose");
    case "A02":
      return firstMesaIn(state, "ocupada", "sirviendo");
    case "A03":
      return firstMesaIn(state, "terminando", "recogiendo");
    case "A04":
      return firstMesaIn(state, "libre");
    case "A05":
      return firstMesaIn(state, "preparandose", "reservada");
    case "B02":
      return firstMesaIn(state, "ocupada", "sirviendo");
    case "B03":
      return firstMesaIn(state, "terminando", "recogiendo", "ocupada");
    default:
      return null;
  }
}

export function canRunEvent(
  event: ChoreographyEventId,
  state: SceneState,
  activeEvent: ChoreographyEventId | null,
): boolean {
  if (activeEvent !== null) return false;

  switch (event) {
    case "A01":
      return mesaStates(state).includes("preparandose");
    case "A02":
      return mesaStates(state).some((s) => s === "ocupada" || s === "sirviendo");
    case "A03":
      return mesaStates(state).some((s) => s === "terminando" || s === "recogiendo");
    case "A04":
      return mesaStates(state).includes("libre");
    case "A05":
      return mesaStates(state).some((s) => s === "preparandose" || s === "reservada");
    case "B01":
      return true;
    case "B02":
      return mesaStates(state).some((s) => s === "ocupada" || s === "sirviendo");
    case "B03":
      return mesaStates(state).some((s) => s === "terminando" || s === "recogiendo" || s === "ocupada");
    case "C01":
      return state.pass === "quieto";
    case "C02":
      return state.pass === "quieto";
    case "D01":
      return state.entrada === "cerrada" || state.entrada === "entreabierta";
    case "D02":
      return state.entrada !== "cruce";
    case "D03":
      return state.entrada !== "cruce";
    default:
      return false;
  }
}

export function eventsAreIncompatible(a: ChoreographyEventId, b: ChoreographyEventId): boolean {
  if (a === b) return true;
  for (const [left, right] of INCOMPATIBLE_PAIRS) {
    if ((a === left && b === right) || (a === right && b === left)) return true;
  }
  return false;
}

function shareMesaTarget(a: ChoreographyEventId, b: ChoreographyEventId, state: SceneState): boolean {
  const mesaTargetA = getEventTargetMesa(a, state);
  const mesaTargetB = getEventTargetMesa(b, state);
  return mesaTargetA !== null && mesaTargetA === mesaTargetB;
}

function isHumanEvent(event: ChoreographyEventId): boolean {
  return HUMAN_EVENTS.has(event);
}

export function getValidEvents(state: SceneState, activeEvent: ChoreographyEventId | null): ChoreographyEventId[] {
  return ALL_EVENTS.filter((event) => canRunEvent(event, state, activeEvent));
}

export function pickNextEvent(
  state: SceneState,
  activeEvent: ChoreographyEventId | null,
  lastEvent: ChoreographyEventId | null,
  preferUnused: ReadonlySet<ChoreographyEventId>,
): ChoreographyEventId | null {
  let candidates = getValidEvents(state, activeEvent);

  if (lastEvent !== null) {
    candidates = candidates.filter((event) => {
      if (eventsAreIncompatible(event, lastEvent)) return false;
      if (shareMesaTarget(event, lastEvent, state)) return false;
      if (isHumanEvent(event) && isHumanEvent(lastEvent)) return false;
      return true;
    });
  }

  const unused = candidates.filter((event) => !preferUnused.has(event));
  const pool = unused.length > 0 ? unused : candidates;

  if (pool.length === 0) return null;

  return pool[randomBetween(0, pool.length - 1)]!;
}

export function applyEvent(state: SceneState, event: ChoreographyEventId): void {
  const mesaTarget = getEventTargetMesa(event, state);

  switch (event) {
    case "A01":
      if (mesaTarget) state[mesaTarget] = "ocupada";
      break;
    case "A02":
      if (mesaTarget) state[mesaTarget] = "terminando";
      break;
    case "A03":
      if (mesaTarget) state[mesaTarget] = "libre";
      break;
    case "A04":
      if (mesaTarget) state[mesaTarget] = "preparandose";
      break;
    case "A05":
      if (mesaTarget) state[mesaTarget] = "ocupada";
      break;
    case "B01":
      break;
    case "B02":
      if (mesaTarget) state[mesaTarget] = "sirviendo";
      break;
    case "B03":
      if (mesaTarget) state[mesaTarget] = "recogiendo";
      break;
    case "C01":
      state.cocina = "respira";
      state.pass = "quieto";
      break;
    case "C02":
      state.pass = "cruce";
      break;
    case "D01":
      state.entrada = "entreabierta";
      break;
    case "D02":
      state.entrada = "cruce";
      break;
    case "D03":
      state.entrada = "entreabierta";
      break;
    default:
      break;
  }

  if (event === "C02") {
    state.pass = "quieto";
  }
  if (event === "C01") {
    state.cocina = "espera";
  }
  if (event === "B01") {
    /* crossing — no persistent zone flip */
  }
  if (event === "D02" || event === "D03") {
    state.entrada = "entreabierta";
  }
  if (state.barra === "recogiendo" && (event === "B02" || event === "B03")) {
    state.barra = "preparando";
  } else if (state.barra === "preparando") {
    state.barra = "tranquila";
  }
}

export function getEventDurationMs(event: ChoreographyEventId): number {
  return EVENT_DURATION_MS[event];
}

export function getSilenceDurationMs(): number {
  return randomBetween(4_000, 8_000);
}

export type MovementController = {
  getSnapshot: () => MovementSnapshot;
  dispose: () => void;
};

export function createMovementController(
  onSnapshot: (snapshot: MovementSnapshot) => void,
  options?: { reducedMotion?: boolean },
): MovementController {
  const reducedMotion = options?.reducedMotion ?? false;
  const state = createInitialSceneState();
  let phase: MovementPhase = "silence";
  let activeEvent: ChoreographyEventId | null = null;
  let lastEvent: ChoreographyEventId | null = null;
  const executedOnce = new Set<ChoreographyEventId>();
  const timers: number[] = [];

  const emit = (): void => {
    onSnapshot({
      phase,
      activeEvent,
      state: { ...state },
    });
  };

  const clearTimers = (): void => {
    for (const id of timers) window.clearTimeout(id);
    timers.length = 0;
  };

  const schedule = (fn: () => void, delayMs: number): void => {
    timers.push(window.setTimeout(fn, delayMs));
  };

  const runCadenceAfterEvent = (): void => {
    phase = "silence";
    activeEvent = null;
    emit();

    schedule(() => {
      phase = "breathing";
      emit();

      schedule(() => {
        phase = "silence";
        emit();

        schedule(() => {
          scheduleNextEvent();
        }, getSilenceDurationMs());
      }, getSilenceDurationMs());
    }, getSilenceDurationMs());
  };

  const scheduleNextEvent = (): void => {
    if (reducedMotion) return;

    const next = pickNextEvent(state, null, lastEvent, executedOnce);
    if (next === null) {
      schedule(scheduleNextEvent, getSilenceDurationMs());
      return;
    }

    phase = "event";
    activeEvent = next;
    emit();

    schedule(() => {
      applyEvent(state, next);
      executedOnce.add(next);
      lastEvent = next;
      runCadenceAfterEvent();
    }, getEventDurationMs(next));
  };

  emit();

  if (!reducedMotion) {
    schedule(scheduleNextEvent, randomBetween(2_000, 4_000));
  }

  return {
    getSnapshot: () => ({
      phase,
      activeEvent,
      state: { ...state },
    }),
    dispose: () => {
      clearTimers();
    },
  };
}
