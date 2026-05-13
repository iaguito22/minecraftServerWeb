import React, { useState, useEffect, useCallback } from 'react';
import {
  Server, Monitor, Download, ChevronRight,
  Shield, Zap, Cpu, Eye, ArrowLeft,
  Gamepad2, Info, Copy, Check, Users, Sparkles, Sun, Moon,
  HardDrive, Wifi, Clock, Menu, X, RefreshCw,
  Wrench, Plane, Skull, ShieldAlert, Terminal, AlertTriangle, Box, Settings
} from 'lucide-react';
import potatoImg from './assets/potato.png';
import lowImg from './assets/low.png';
import highImg from './assets/high.png';
import './index.css';

// --- COMPONENTS ---

const TabNav = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = ['home', 'servidor', 'modpacks', 'acerca'];

  const handleTab = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <nav className="nav-bar glass animate-enter">
      <div className="flex items-center gap-3">
        <div className="nav-logo-icon">
          <Gamepad2 size={24} />
        </div>
        <span className="text-xl font-bold text-gradient">Feixismo MC</span>
      </div>

      {/* Desktop links */}
      <div className="nav-links flex items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTab(tab)}
          >
            {tab === 'acerca' ? 'El Mundo' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn ml-4"
          title="Cambiar tema"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Mobile right side */}
      <div className="nav-mobile-right">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title="Cambiar tema"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`mobile-menu-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const HomeTab = ({ setActiveTab }) => (
  <div className="flex-col items-center text-center animate-enter delay-100 -mt-20">
    <div className="badge mb-8 border-orange-500/50 bg-orange-500/10 text-orange-400 px-8 py-3 text-base font-bold">
      <Wrench size={20} /> <span>JAVA 1.21.1 — NEOFORGE</span>
    </div>
    <h1 className="text-gradient text-4xl mb-4">Feixismo MC</h1>
    <p className="text-secondary mb-8 max-w-2xl text-xl mx-auto leading-relaxed">
      Bienvenido a un entorno industrial sin concesiones. Diseña fábricas, construye aeronaves físicas y sobrevive en un mundo donde la tecnología es tu única defensa.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn btn-primary bg-orange-600 hover:bg-orange-700 border-none px-8 py-6 text-lg" onClick={() => setActiveTab('modpacks')}>
        <Download size={22} /> Obtener Modpacks
      </button>
      <button className="btn btn-outline px-8 py-6 text-lg" onClick={() => setActiveTab('servidor')}>
        <Server size={22} /> Información del server
      </button>
    </div>
  </div>
);

const ServerTab = () => {
  const [copied, setCopied] = useState(false);
  const [serverStats, setServerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const ip = "141.253.109.219:25565";

  const fetchStats = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      // Intento 1: Proxy avanzado (con CPU/RAM)
      const response = await fetch('https://mc-status-proxy.igl2005.workers.dev/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Worker no responde");
      const data = await response.json();
      setServerStats(data);
      setIsBlocked(false);
    } catch (error) {
      console.warn("Conexión avanzada bloqueada o caída, usando respaldo...");
      setIsBlocked(true);

      // Intento 2: API pública (Backup)
      try {
        const fbResponse = await fetch('https://api.mcsrvstat.us/3/141.253.109.219');
        const fbData = await fbResponse.json();

        if (fbData.online) {
          setServerStats({
            estado_maquina: 'running',
            jugadores_conectados: fbData.players?.online || 0,
            jugadores_maximos: fbData.players?.max || 20,
            tiempo_encendido: 'Disponible',
            cpu_uso: "0%",
            ram_mb: "0",
            disco_mb: "0",
            red_bajada_kb: "0",
            red_subida_kb: "0",
            isFallback: true
          });
        } else {
          setServerStats({ estado_maquina: 'offline' });
        }
      } catch (fbError) {
        setServerStats({ estado_maquina: 'offline' });
      }
    } finally {
      setLoading(false);
      setCountdown(20);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStats();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchStats]);

  const handleManualRefresh = () => {
    if (!loading) {
      setCountdown(20);
      setLoading(true);
      fetchStats();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-enter delay-100 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-gradient text-3xl">Información de nuestro servidor:</h2>
        <p className="text-secondary text-lg">Únete a nosotros para la mejor experiencia survival.</p>

        {/* IP Box */}
        <div className="ip-box" onClick={handleCopy} title="Haz clic para copiar">
          {ip}
          {copied ? <Check size={24} color="#4ade80" /> : <Copy size={24} />}
        </div>
        {copied && <p className="text-green-400 mt-2 text-sm font-medium">¡IP Copiada al portapapeles!</p>}

        {/* Live Server Status Widget */}
        <div className={`server-widget mt-6 ${serverStats?.estado_maquina === 'running' ? 'online' :
          serverStats?.estado_maquina === 'starting' ? 'starting' : 'offline'
          }`}>

          <div className="server-widget-header">
            <div className="flex items-center gap-4">
              <div className="status-indicator">
                {serverStats?.estado_maquina === 'running' && <span className="status-ping"></span>}
                <span className={`status-dot ${serverStats?.estado_maquina === 'running' ? 'online' :
                  serverStats?.estado_maquina === 'starting' ? 'starting' : 'offline'
                  }`}></span>
              </div>
              <h3 className={`status-title ${serverStats?.estado_maquina === 'running' ? 'online' :
                serverStats?.estado_maquina === 'starting' ? 'starting' : 'offline'
                }`}>
                {loading && !serverStats ? 'Conectando...' :
                  serverStats?.estado_maquina === 'running' ? 'Servidor Online' :
                    serverStats?.estado_maquina === 'starting' ? 'Servidor Iniciando...' : 'Servidor Offline'}
              </h3>

              {serverStats && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={handleManualRefresh}
                    disabled={loading}
                    style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
                    className="text-secondary hover:text-white transition-colors cursor-pointer"
                    title="Actualizar estado"
                  >
                    <RefreshCw size={18} className={loading ? "animate-spin text-white" : ""} />
                  </button>
                  <span className="text-sm text-secondary font-mono">{countdown}s</span>
                </div>
              )}
            </div>

            {!loading && serverStats?.estado_maquina === 'running' && (
              <div className="uptime-badge">
                <Clock size={16} className="text-blue-400" />
                <span>Tiempo activo: <span className="text-white font-medium">{serverStats.tiempo_encendido}</span></span>
              </div>
            )}
          </div>

          {!loading && serverStats?.estado_maquina === 'running' && (
            <>
              {isBlocked && (
                <div className="mx-6 mt-4 mb-6 p-4 glass flex items-start gap-3 border-amber-500/30 animate-enter" style={{ background: 'rgba(245, 158, 11, 0.05)' }}>
                  <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200/80 leading-relaxed">
                    <strong className="text-amber-400 block mb-0.5">Estadísticas limitadas</strong>
                    La conexión con el monitor de hardware parece estar bloqueada. Si usas un bloqueador de anuncios (uBlock/AdBlock) o VPN, prueba a desactivarlo para ver los datos de CPU/RAM.
                  </div>
                </div>
              )}
              <div className="server-widget-grid">

                <div className="stat-card">
                  <div className="stat-label">
                    <Users size={18} /> Jugadores
                  </div>
                  <div className="stat-value">
                    {serverStats.jugadores_conectados} <span className="stat-unit">/ {serverStats.jugadores_maximos}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    <Cpu size={18} /> CPU
                  </div>
                  <div className="stat-value">
                    {serverStats.isFallback ? 'N/A' : `${(parseFloat(serverStats.cpu_uso) / 4).toFixed(1)}%`} <span className="stat-unit">/ 100%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    <Server size={18} /> RAM
                  </div>
                  <div className="stat-value">
                    {serverStats.isFallback ? 'N/A' : (parseFloat(serverStats.ram_mb) / 1024).toFixed(1)} <span className="stat-unit">/ 24 GB</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    <HardDrive size={18} /> Disco
                  </div>
                  <div className="stat-value">
                    {serverStats.isFallback ? 'N/A' : (parseFloat(serverStats.disco_mb) / 1024).toFixed(1)} <span className="stat-unit">GB</span>
                  </div>
                </div>

                <div className="stat-card wide">
                  <div className="stat-label">
                    <Wifi size={18} /> Red
                  </div>
                  <div className="w-full mx-auto mt-3 px-1" style={{ maxWidth: '180px' }}>
                    <div className="flex justify-between items-center gap-2 mb-2">
                      <span className="stat-unit" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Bajada:</span>
                      <span className="text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{serverStats.isFallback ? 'N/A' : parseFloat(serverStats.red_bajada_kb).toFixed(0)} <span className="stat-unit" style={{ fontSize: '0.7rem', fontWeight: 400 }}>{serverStats.isFallback ? '' : 'KB/s'}</span></span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="stat-unit" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Subida:</span>
                      <span className="text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{serverStats.isFallback ? 'N/A' : parseFloat(serverStats.red_subida_kb).toFixed(0)} <span className="stat-unit" style={{ fontSize: '0.7rem', fontWeight: 400 }}>{serverStats.isFallback ? '' : 'KB/s'}</span></span>
                    </div>
                  </div>
                </div>

              </div>

              {serverStats.nombres_jugadores && serverStats.nombres_jugadores.length > 0 && (
                <div className="player-row">
                  <span className="player-row-label"><Users size={14} /> En línea ahora:</span>
                  {serverStats.nombres_jugadores.map((nombre, i) => (
                    <span key={i} className="player-tag">{nombre}</span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="glass-card mt-8 mb-8 flex flex-row flex-wrap gap-8 justify-around p-6">
        <div className="flex items-center gap-4 text-left">
          <Cpu className="text-blue-400" size={36} />
          <div>
            <h4 className="text-xl mb-1 text-white">Procesador</h4>
            <p className="text-secondary font-medium">4 OCPU</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-left">
          <Server className="text-blue-400" size={36} />
          <div>
            <h4 className="text-xl mb-1 text-white">Memoria RAM</h4>
            <p className="text-secondary font-medium">24 GB</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-left">
          <Zap className="text-blue-400" size={36} />
          <div>
            <h4 className="text-xl mb-1 text-white">Red</h4>
            <p className="text-secondary font-medium">4 Gbps de Ancho</p>
          </div>
        </div>
      </div>

      <div className="glass-card border-blue-500/20">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="text-blue-500" size={32} />
          <h3 className="directives-title mb-0">Directrices de Supervivencia</h3>
        </div>

        <div className="rule-item border-l-2 border-blue-500/30 pl-6 py-4">
          <div className="flex items-start gap-4">
            <Skull className="text-blue-500 mt-1" size={24} />
            <div>
              <h4 className="mb-2 text-xl text-white uppercase tracking-wider">Libertad y Consecuencias</h4>
              <p className="text-secondary leading-relaxed">
                Este es un mundo de supervivencia pura. Tienes libertad total: juega en cooperativo, mantén la paz o ve por tu cuenta.
                <span className="text-white font-bold block mt-2">
                  Si decides ser hostil, robar o sabotear a otros, asume que la comunidad puede (y probablemente lo hará) cazarte y destruir todo lo que has construido.
                </span>
                No hay protecciones mágicas ni zonas seguras artificiales. Apechugas con tus actos.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-item border-l-2 border-orange-500/30 pl-6 py-4 mt-4">
          <div className="flex items-start gap-4">
            <Cpu className="text-orange-500 mt-1" size={24} />
            <div>
              <h4 className="mb-2 text-xl text-white uppercase tracking-wider">Eficiencia de Máquinas</h4>
              <p className="text-secondary">
                La ingeniería requiere optimización. No satures el servidor con mecanismos infinitos e innecesarios si no estás presente. Si tu fábrica causa lag crítico, será desmantelada sin previo aviso.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-item border-l-2 border-yellow-500/30 pl-6 py-4 mt-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-yellow-500 mt-1" size={24} />
            <div>
              <h4 className="mb-2 text-xl text-white uppercase tracking-wider">Límites de Exploración</h4>
              <p className="text-secondary">
                Como recomendación para mantener la estabilidad, evita alejarte más de 15,000 bloques del centro. Generar terreno a distancias extremas puede ralentizar el servidor y arruinar la experiencia de juego de todos. ¡Hay mucho espacio disponible cerca!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceChart = ({ selectedPackId }) => {
  const rtxData = [
    { id: 'potato', name: 'Potato Pack', fps: 275 },
    { id: 'lowAesthetic', name: 'Low Aesthetic', fps: 121 },
    { id: 'highAesthetic', name: 'High Aesthetic', fps: 53 }
  ];

  const integratedData = [
    { id: 'potato', name: 'Potato Pack', fps: 150 },
    { id: 'lowAesthetic', name: 'Low Aesthetic', fps: 52 },
    { id: 'highAesthetic', name: 'High Aesthetic', fps: 18 }
  ];

  // Global max to normalize bars between both charts
  const globalMaxFps = Math.max(
    ...rtxData.map(d => d.fps),
    ...integratedData.map(d => d.fps)
  );

  const ChartBlock = ({ title, icon, data, titleColor }) => {
    return (
      <div className="flex-1 p-6 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-md shadow-xl">
        <h4 className={`text-[11px] mb-6 ${titleColor} font-black uppercase tracking-[0.25em] flex items-center gap-2`}>
          {icon}
          {title}
        </h4>
        <div className="space-y-6">
          {data.map((item, index) => {
            const isSelected = item.id === selectedPackId;
            const width = `${(item.fps / globalMaxFps) * 100}%`;
            
            return (
              <div key={index} className="group">
                <div className="flex justify-between text-[11px] mb-2 px-1">
                  <span className={`${isSelected ? 'text-green-400 font-black' : 'text-blue-300/60 font-bold'} group-hover:text-white transition-colors uppercase tracking-wider`}>
                    {item.name} {isSelected && '— ACTUAL'}
                  </span>
                  <span className={`font-black ${isSelected ? 'text-green-400' : 'text-blue-200'}`}>{item.fps} FPS</span>
                </div>
                <div className="w-full bg-slate-800/40 rounded-full border border-white/5 overflow-hidden" style={{ height: '8px' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: width,
                      backgroundColor: isSelected ? '#22c55e' : '#3b82f6',
                      opacity: isSelected ? 1 : 0.4,
                      boxShadow: isSelected ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6">
      <ChartBlock 
        title="NVIDIA RTX 3050 (1440p)" 
        icon={<Zap size={14} />} 
        data={rtxData}
        titleColor="text-blue-400"
      />
      <ChartBlock 
        title="Gráficos Integrados (1440p)" 
        icon={<Monitor size={14} />} 
        data={integratedData}
        titleColor="text-slate-400"
      />
    </div>
  );
};

const ModpacksTab = ({ setActiveTab }) => {
  const [view, setView] = useState('main'); // main, client, detail
  const [selectedPack, setSelectedPack] = useState(null);

  const packs = {
    server: {
      id: 'server',
      title: 'Archivos Base (Servidor)',
      icon: <Server size={40} className="text-blue-400" />,
      desc: 'El modpack base para jugar en el servidor. No incluye mods de optimización extra.',
      features: ['Todos los mods del servidor', 'Configuraciones', 'Sin optimización'],
      performance: {
        fps: '59-110 FPS (Avg: 90)',
        ram: 'Prueba: 2832 MB',
        gpu: 'AMD Radeon Integrated Graphics',
        usage: 'GPU 67% | CPU 20%',
        dh: 'Desactivado',
        resolution: '1440p'
      },
      downloadUrl: 'https://github.com/iaguito22/minecraftServerWeb/releases/download/v1/server.zip'
    },
    potato: {
      id: 'potato',
      title: 'Pack Potato (Optimización)',
      icon: <Zap size={40} className="text-blue-400" />,
      desc: 'El pack más ligero. Contiene mods de optimización pura para exprimir cada FPS. Recomendado para PCs humildes.',
      features: ['Optimización (Chloride, Lithium, etc.)', 'Dynamic Lights (Realtime)', 'FPS al máximo', 'Create Mod Base'],
      performance: {
        fps: '200-275 FPS (Avg: 230)',
        ram: 'Prueba: 3088 MB',
        gpu: 'NVIDIA GeForce RTX 3050',
        usage: 'GPU 100% | CPU 56%',
        dh: 'Desactivado',
        resolution: '1440p'
      },
      screenshot: potatoImg,
      downloadUrl: 'https://github.com/iaguito22/minecraftServerWeb/releases/download/v1/potato.zip'
    },
    lowAesthetic: {
      id: 'lowAesthetic',
      title: 'Low Aesthetic (Potato + Shaders)',
      icon: <Eye size={40} className="text-blue-400" />,
      desc: 'Optimización + Distant Horizons (DH) + Shaders ligeros. Una experiencia bonita sin sacrificar tanto rendimiento.',
      features: ['Mods de Optimización', 'Distant Horizons', 'Shaders E-LITE 5.0.1', 'Mejora visual fluida'],
      performance: {
        fps: '102-121 FPS (Avg: 116)',
        ram: 'Prueba: 2720 MB',
        gpu: 'NVIDIA GeForce RTX 3050',
        usage: 'GPU 100% | CPU 51%',
        dh: 'Activado',
        resolution: '1440p'
      },
      screenshot: lowImg,
      downloadUrl: 'https://github.com/iaguito22/minecraftServerWeb/releases/download/v1/low.zip'
    },
    highAesthetic: {
      id: 'highAesthetic',
      title: 'High Aesthetic (Ultra)',
      icon: <Sparkles size={40} className="text-blue-400" />,
      desc: 'La experiencia definitiva. Optimización + DH + Shaders en High. Visuales impresionantes, requiere PC potente.',
      features: ['Mods de Optimización', 'Distant Horizons', 'Shaders Solas V3.6', 'Visuales impresionantes'],
      performance: {
        fps: '47-53 FPS (Avg: 52)',
        ram: 'Prueba: 2722 MB',
        gpu: 'NVIDIA GeForce RTX 3050',
        usage: 'GPU 100% | CPU 56%',
        dh: 'Activado',
        resolution: '1440p'
      },
      screenshot: highImg,
      downloadUrl: 'https://github.com/iaguito22/minecraftServerWeb/releases/download/v1/high.zip'
    }
  };

  const openDetail = (packId) => {
    setSelectedPack(packs[packId]);
    setView('detail');
  };

  const renderMain = () => (
    <div className="animate-enter delay-100 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-gradient">Descargas</h2>
        <p className="text-secondary text-lg">¿Qué necesitas descargar?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card cursor-pointer items-center text-center" onClick={() => openDetail('server')}>
          <div className="bg-blue-600/10 p-6 rounded-full mb-6">
            <Server size={48} className="text-blue-400" />
          </div>
          <h3 className="mb-2">Servidor</h3>
          <p className="text-secondary mb-6">Archivos del servidor (.zip con mods y config).</p>
          <button className="btn btn-primary mt-auto w-full">
            Ver Detalles <ChevronRight size={18} />
          </button>
        </div>

        <div className="glass-card cursor-pointer items-center text-center" onClick={() => setView('client')}>
          <div className="bg-blue-600/10 p-6 rounded-full mb-6">
            <Monitor size={48} className="text-blue-400" />
          </div>
          <h3 className="mb-2">Cliente</h3>
          <p className="text-secondary mb-6">Modpacks para jugar (diferentes niveles gráficos).</p>
          <button className="btn btn-primary mt-auto w-full">
            Ver Opciones <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderClientPacks = () => (
    <div className="animate-enter max-w-5xl mx-auto">
      <button className="btn btn-outline mb-8" onClick={() => setView('main')}>
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="text-center mb-16">
        <h2 className="text-gradient">Selecciona tu Modpack</h2>
        <p className="text-secondary text-lg">Elige la versión que mejor se adapte a tu PC.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {['potato', 'lowAesthetic', 'highAesthetic'].map(key => (
          <div key={key} className="glass-card cursor-pointer items-center text-center" onClick={() => openDetail(key)}>
            <div className="mb-6 bg-blue-600/10 p-4 rounded-2xl border border-blue-500/10 w-max">{packs[key].icon}</div>
            <h3 className="text-xl mb-3">{packs[key].title}</h3>
            <p className="text-secondary text-sm mb-6 flex-1">{packs[key].desc}</p>
            <button className="btn btn-outline w-full justify-between">
              Seleccionar <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedPack) return null;
    return (
      <div className="animate-enter max-w-5xl mx-auto glass-card relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>

        <button
          className="btn btn-outline mb-8 w-max"
          onClick={() => setView(selectedPack.title.includes('Servidor') ? 'main' : 'client')}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="p-4 bg-blue-900/30 rounded-2xl border border-blue-500/20 w-max">
            {selectedPack.icon}
          </div>
          <div>
            <h2 className="mb-2 text-3xl">{selectedPack.title}</h2>
            <div className="badge">1.21.1 / NeoForge</div>
          </div>
        </div>

        <p className="text-lg text-secondary mb-8">{selectedPack.desc}</p>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-stretch max-w-4xl mx-auto w-full px-4">
          {/* Content Card */}
          <div className="flex-1 glass-card !p-6 border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Box className="text-blue-400" size={18} /> Contenido
            </h4>
            <ul className="space-y-4 flex-1">
              {selectedPack.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40"></div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Performance Card */}
          <div className="flex-1 glass-card !p-6 border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/30"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Cpu className="text-orange-400" size={18} /> Rendimiento (1440p)
            </h4>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                {/* RTX 3050 */}
                <div className="space-y-4">
                  <div className="text-[13px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Zap size={20} /> RTX 3050
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-label">Promedio:</span>
                      <div className="text-5xl font-black text-white leading-none pt-2">
                        {selectedPack.performance.fps.split('(')[1].replace('Avg: ', '').replace(')', '').replace(' FPS', '')} <span className="text-[12px] text-slate-500 uppercase">fps</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-label">Rango:</span>
                      <div className="text-xs font-bold text-slate-300">{selectedPack.performance.fps.split(' ')[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Integrated */}
                <div className="space-y-4 border-l border-white/5 pl-8">
                  <div className="text-[13px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Monitor size={20} /> Integrados
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-label">Promedio:</span>
                      <div className="text-5xl font-black text-slate-200 leading-none pt-2">
                        {selectedPack.id === 'potato' ? '130' : 
                         selectedPack.id === 'lowAesthetic' ? '45' : 
                         selectedPack.id === 'highAesthetic' ? '15' : '0'} <span className="text-[12px] text-slate-500 uppercase">fps</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-label">Rango:</span>
                      <div className="text-xs font-bold text-slate-300">
                        {selectedPack.id === 'potato' ? '110-150' :
                          selectedPack.id === 'lowAesthetic' ? '38-52' :
                            selectedPack.id === 'highAesthetic' ? '12-18' : 'N/A'} FPS
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-20 border-t border-white/5">
                <div className="flex flex-col gap-1 col-span-2 mb-2">
                  <span className="text-label text-blue-400 font-bold">RAM (Prueba):</span>
                  <span className="text-2xl text-white font-black">{selectedPack.performance.ram}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">Uso Sistema:</span>
                  <span className="text-value">{selectedPack.performance.usage}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">DH Mod:</span>
                  <span className="text-value">{selectedPack.performance.dh}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">Resolución:</span>
                  <span className="text-value">1440p (Native)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot Section */}
        <div className="max-w-4xl mx-auto mb-12 mt-10">
          {selectedPack.screenshot && (
            <div className="space-y-4">
              <div className="screenshot-frame glass !p-1 overflow-hidden border border-white/5 shadow-2xl group relative rounded-2xl bg-slate-900/40">
                <img
                  src={selectedPack.screenshot}
                  alt="Benchmark Screenshot"
                  className="w-full rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="screenshot-overlay absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="text-xl font-black text-white">{selectedPack.performance.gpu} — {selectedPack.title}</div>
                </div>
              </div>
            </div>
          )}
          <PerformanceChart selectedPackId={selectedPack.id} />
        </div>

        <div className="mt-12 space-y-4">
          <a
            href={selectedPack.downloadUrl}
            download={`${selectedPack.id}_pack.zip`}
            className="btn btn-primary w-full py-6 text-xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)]"
          >
            <Download size={28} /> Descargar Modpack .zip
          </a>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => setActiveTab('acerca')}
              className="btn btn-outline py-4 font-bold uppercase tracking-wider border-white/10 text-slate-300 hover:text-white"
            >
              <Info size={18} /> Guía de Instalación
            </button>
          </div>

          <div className="mt-12 p-6 bg-blue-500/[0.03] rounded-2xl border border-blue-500/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h4 className="text-xs font-black text-blue-400 mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
              <Settings size={14} /> Personalización de Interfaz
            </h4>
            <p className="text-xs text-secondary leading-relaxed font-medium">
              Los mods de interfaz como <span className="text-blue-300 font-bold">JourneyMap</span> (minimapa) y <span className="text-blue-300 font-bold">Jade</span> (información de bloques) son <span className="text-slate-200">100% opcionales</span>.
              Puedes configurarlos, ocultarlos o desactivarlos en tu cliente para una experiencia más inmersiva.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {view === 'main' && renderMain()}
      {view === 'client' && renderClientPacks()}
      {view === 'detail' && renderDetail()}
    </div>
  );
};

const AboutTab = () => (
  <div className="animate-enter delay-100 max-w-5xl mx-auto px-6 pb-32 flex flex-col gap-8">
    {/* Bloque 1: El Mundo */}
    <section className="text-center pt-4">
      <div className="bg-orange-600/10 p-5 rounded-full mb-4 w-max mx-auto border border-orange-500/20">
        <Plane size={44} className="text-orange-500" />
      </div>
      <h2 className="text-gradient mb-3 text-5xl">El Mundo y el Meta</h2>
      <p className="text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
        No es un servidor para ir corriendo y jugar solo dos días, es un mundo pensado para que pases tiempo en él construyendo grandes proyectos. La experiencia central gira en torno a la ingeniería avanzada con <span className="theme-text-primary font-bold">Create</span>.
        Diseña redes ferroviarias masivas, automatiza fábricas complejas y conquista los cielos con aeronaves físicas reales mediante <span className="theme-text-primary font-bold">Create: Aeronautics</span>.
        Y si alguien te estorba, <span className="theme-text-primary font-bold">Create Big Cannons</span> te da la potencia de fuego necesaria para defender lo que es tuyo.
      </p>
    </section>

    {/* Bloque 2: Mods Principales */}
    <section className="glass-card p-8 md:p-10">
      <h3 className="text-2xl mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
        <Box className="text-blue-400" /> Manifiesto Tecnológico (Mods)
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Wrench size={18} /> Núcleo Técnico y Físicas</h4>
            <p className="text-sm text-secondary">Create, Aeronautics, Big Cannons, Diesel Generators.</p>
            <br />
          </div>
          <div className="pt-4">
            <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Plane size={18} /> Mundo y Estructuras</h4>
            <p className="text-sm text-secondary">TerraBlender, Colección de YUNG's, Moog's Structures.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Skull size={18} /> Criaturas y Vida</h4>
            <p className="text-sm text-secondary">Naturalist (Ecosistemas vivos y peligrosos).</p>
            <br />
          </div>
          <div className="pt-4">
            <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Zap size={18} /> Utilidad y Combate</h4>
            <p className="text-sm text-secondary">Sophisticated Backpacks, Simple Voice Chat, Better Combat, Macaw's Mods.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Bloque 3: Acceso y Seguridad */}
    <div className="grid md:grid-cols-2 gap-8">
      <section className="glass-card p-8 md:p-10 border-blue-500/20 flex flex-col h-full">
        <h3 className="text-xl mb-6 flex items-center gap-3 text-blue-400">
          <Terminal size={24} /> Comandos de Acceso
        </h3>
        <div className="space-y-4 font-mono flex-grow">
          <div className="bg-black/40 p-3 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-secondary mb-1">Primera vez:</p>
            <p className="text-blue-300">/register &lt;contraseña&gt; &lt;contraseña&gt;</p>
          </div>
          <div className="bg-black/40 p-3 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-secondary mb-1">Entradas posteriores:</p>
            <p className="text-blue-300">/login &lt;contraseña&gt;</p>
          </div>
        </div>

        <div className="mt-8 p-5 bg-amber-600/10 border border-amber-500/30 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <div className="flex items-center gap-3 text-amber-400 font-bold mb-2">
            <AlertTriangle size={20} className="animate-pulse" />
            <span className="text-xs uppercase tracking-widest">Seguridad</span>
          </div>
          <p className="text-sm text-amber-200 font-black tracking-tight leading-tight">
            ¡ES VITAL QUE NO OLVIDES TU CONTRASEÑA!<br />
            <span className="text-[10px] opacity-70 font-medium uppercase">No podemos recuperarla manualmente.</span>
          </p>
        </div>
      </section>

      <section className="glass-card p-8 md:p-10 flex flex-col h-full">
        <h3 className="text-xl mb-6 flex items-center gap-3 text-orange-400">
          <Download size={24} /> Protocolo de Instalación
        </h3>
        <ol className="text-sm text-secondary space-y-4 list-decimal pl-5 flex-grow">
          <li>Descarga el archivo .zip de la sección de Modpacks.</li>
          <li className="p-3 bg-orange-600/10 border border-orange-500/20 rounded-xl font-bold text-white shadow-lg shadow-orange-900/10">
            Limpia tu carpeta <code className="bg-white/20 px-1.5 rounded text-orange-400">mods</code> anterior en .minecraft para evitar conflictos.
          </li>
          <li>Descomprime el contenido del .zip en tu directorio <code className="bg-white/10 px-1 rounded">.minecraft</code>.</li>
          <li>Inicia el juego usando el perfil de <span className="text-orange-400 font-bold">NeoForge 1.21.1</span>.</li>
        </ol>
      </section>
    </div>

    {/* Bloque 4: Preguntas Frecuentes (Q&A) */}
    <section className="glass-card p-8 md:p-10 border-blue-500/20 mt-2">
      <h3 className="text-2xl mb-8 flex items-center gap-3 border-b border-white/10 pb-4 text-blue-400">
        <Info size={28} /> Q&A - Preguntas Frecuentes
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-black/20 p-5 rounded-xl border border-white/5 transition-all hover:bg-black/40">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">¿Hay comandos de /tpa o /home?</h4>
            <p className="text-sm text-secondary">No. Queremos mantener la inmersión y la importancia de la infraestructura. Para viajar rápido deberás construir vehiculos con Create o usar medios de transporte físicos.</p>
          </div>
          <div className="bg-black/20 p-5 rounded-xl border border-white/5 transition-all hover:bg-black/40">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">¿Existen las protecciones de zona (Claims)?</h4>
            <p className="text-sm text-secondary">No. No hay bloques de protección mágicos. Si quieres asegurar tus cosas, construye una base oculta, lejos, o defiéndela con sistemas de seguridad mecánicos o formando alianzas.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-black/20 p-5 rounded-xl border border-white/5 transition-all hover:bg-black/40">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">¿Es obligatorio usar el chat de voz?</h4>
            <p className="text-sm text-secondary">No es obligatorio, pero es altamente recomendado. Gran parte de la diplomacia, el comercio y la supervivencia depende de poder comunicarte rápidamente con los que te encuentras.</p>
          </div>
          <div className="bg-black/20 p-5 rounded-xl border border-white/5 transition-all hover:bg-black/40">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">¿Puedo añadir minimapas o mods visuales?</h4>
            <p className="text-sm text-secondary">Sí, los mods que sean puramente visuales o de información en el cliente (como minimapas tipo JourneyMap o mods de inventario) están permitidos mientras no otorguen una ventaja injusta (como X-Ray).</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// --- MAIN APP ---

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex flex-col">
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />

        <main className="flex-grow flex flex-col justify-center pb-12">
          {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
          {activeTab === 'servidor' && <ServerTab />}
          {activeTab === 'modpacks' && <ModpacksTab setActiveTab={setActiveTab} />}
          {activeTab === 'acerca' && <AboutTab />}
        </main>
      </div>

      <footer className="w-full text-center text-secondary text-sm py-8 border-t border-white/5 bg-slate-900/30 backdrop-blur-md mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Feixismo MC. Creado para la comunidad.</p>
          <div className="flex items-center gap-3">
            <span className="opacity-50 text-[10px] uppercase tracking-widest font-bold">Versión de Referencia:</span>
            <div className="px-5 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full text-[10px] font-black text-orange-400">
              JAVA 1.21.1 | NEOFORGE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
;
