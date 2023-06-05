import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Homepage = () => {
  const { logout } = useAuth();

  const [logs, setLogs] = useState([]);
  const [deviceBluetooth, setDeviceBluetooth] = useState(null);

  let batteryService = BluetoothUUID.getService("battery_service");

  const connectBluetooth = async () => {
    try {
      addLog("Solicitando dispositivo Bluetooth...");
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [batteryService],
      });
      setDeviceBluetooth(device);
      if (device) {
        addLog("Te conectaste a: " + device.name);
      }
    } catch (error) {
      addLog("Lo siento no se pudo hacer tu solicitud");
    }
  };

  const getBatteryLevel = async () => {
    try {
      addLog("Conectando al servidor GATT...");
      const server = await deviceBluetooth.gatt.connect();

      addLog("Obteniendo servicio de batería...");
      const service = await server.getPrimaryService("battery_service");

      addLog("Obteniendo nivel de batería...");
      const characteristic = await service.getCharacteristic("battery_level");

      addLog("Leyendo nivel de batería...");
      const value = await characteristic.readValue();
      addLog("La bateria es de :" + value.getUint8(0) + "%");
    } catch (error) {
      console.log(error);
    }
  };

  const getDeviceInfo = () => {
    try {
      addLog("* Nombre:             " + deviceBluetooth.name);
      addLog("* Id:               " + deviceBluetooth.id);
      addLog("* Conectado:        " + deviceBluetooth.gatt.connected);
    } catch (error) {
      addLog("Argh! " + error);
    }
  };

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#4443a5",
          padding: "15px",
          justifyContent: "center",
          borderRadius: "5px",
          marginTop: "1rem",
        }}
      >
        <h1 style={{ color: "white" }}>Industria4 - Bluetooth</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            style={{
              padding: "5px",
              bordeRadius: "5px",
              cursor: "pointer",
              border: "1px solid #559fca",
              backgroundColor: "#559fca",
              color: "white",
            }}
            onClick={connectBluetooth}
          >
            Conectar a Bluetooth
          </button>
          <button
            style={{
              padding: "5px",
              bordeRadius: "5px",
              cursor: "pointer",
              border: "1px solid #a83461",
              backgroundColor: "#a83461",
              color: "white",
            }}
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </div>

        <div style={{ width: "450px" }}>
          {logs.length > 0 && (
            <>
              <h2 style={{ textAlign: "center", color: "#ffffff" }}>
                Mensajes:
              </h2>
              {logs.map((log, index) => (
                <p
                  style={{ color: "#ffffff", textAlign: "center" }}
                  key={index}
                >
                  {log}
                </p>
              ))}
              {deviceBluetooth && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                    }}
                  >
                    <button
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        padding: "5px",
                        border: "1px solid #559fca",
                        backgroundColor: "#559fca",
                        color: "white",
                      }}
                      onClick={getBatteryLevel}
                    >
                      Obtener nivel de bateria
                    </button>
                    <button
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        padding: "5px",
                        border: "1px solid #559fca",
                        backgroundColor: "#559fca",
                        color: "white",
                      }}
                      onClick={getDeviceInfo}
                    >
                      Obtener informacion del dispositivo
                    </button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        padding: "5px",
                        bordeRadius: "5px",
                        cursor: "pointer",
                        border: "1px solid #e61062",
                        backgroundColor: "#ec0303",
                        color: "white",
                      }}
                      onClick={() => setLogs([])}
                    >
                      Desconectar dispositivo
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
