import { describe, it, before } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const enginePath = join(__dirname, "..", "lib", "motanOsHosteleriaMovementEngine.ts");

let engine;

const loadTypescriptModule = async (filePath) => {
  const source = readFileSync(filePath, "utf-8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
    fileName: pathToFileURL(filePath).href,
  });

  const encoded = Buffer.from(transpiled.outputText, "utf-8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
};

describe("motanOsHosteleriaMovementEngine", () => {
  before(async () => {
    if (typeof globalThis.window === "undefined") {
      globalThis.window = globalThis;
    }
    engine = await loadTypescriptModule(enginePath);
  });

  it("starts from frame master v1.1 persistent states", () => {
    const state = engine.createInitialSceneState();

    assert.strictEqual(state.mesaA, "recogiendo");
    assert.strictEqual(state.mesaB, "preparandose");
    assert.strictEqual(state.mesaC, "sirviendo");
    assert.strictEqual(state.barra, "recogiendo");
    assert.strictEqual(state.pass, "quieto");
    assert.strictEqual(state.cocina, "respira");
    assert.strictEqual(state.entrada, "entreabierta");
  });

  it("blocks a second event while one is active", () => {
    const state = engine.createInitialSceneState();

    assert.strictEqual(engine.canRunEvent("A01", state, "B01"), false);
    assert.strictEqual(engine.canRunEvent("B01", state, null), true);
  });

  it("enforces choreography incompatibilities", () => {
    assert.strictEqual(engine.eventsAreIncompatible("B02", "B03"), true);
    assert.strictEqual(engine.eventsAreIncompatible("C01", "C02"), true);
    assert.strictEqual(engine.eventsAreIncompatible("D02", "D03"), true);
    assert.strictEqual(engine.eventsAreIncompatible("A02", "A03"), true);
    assert.strictEqual(engine.eventsAreIncompatible("A01", "B01"), false);
  });

  it("resolves mesa targets for staff events", () => {
    const state = engine.createInitialSceneState();

    assert.strictEqual(engine.getEventTargetMesa("A01", state), "mesaB");
    assert.strictEqual(engine.getEventTargetMesa("B02", state), "mesaC");
    assert.strictEqual(engine.getEventTargetMesa("B03", state), "mesaA");
  });

  it("persists mesa state after applyEvent", () => {
    const state = engine.createInitialSceneState();

    engine.applyEvent(state, "A01");
    assert.strictEqual(state.mesaB, "ocupada");

    engine.applyEvent(state, "A02");
    assert.strictEqual(state.mesaB, "terminando");
  });

  it("pickNextEvent returns a runnable event from initial state", () => {
    const state = engine.createInitialSceneState();
    const next = engine.pickNextEvent(state, null, null, new Set());

    assert.ok(next !== null);
    assert.ok(engine.canRunEvent(next, state, null));
  });

  it("reduced motion controller stays static with no active event", () => {
    const snapshots = [];

    const controller = engine.createMovementController(
      (snapshot) => {
        snapshots.push({
          phase: snapshot.phase,
          activeEvent: snapshot.activeEvent,
        });
      },
      { reducedMotion: true },
    );

    assert.strictEqual(controller.getSnapshot().activeEvent, null);
    assert.strictEqual(controller.getSnapshot().phase, "silence");
    assert.ok(snapshots.every((snapshot) => snapshot.activeEvent === null));

    controller.dispose();
  });
});
