import React, { useState, useEffect } from 'react';
import {
  Server, Monitor, Download, ChevronRight,
  Shield, Zap, Cpu, Eye, ArrowLeft,
  Gamepad2, Info, Copy, Check, Users, Sparkles, Sun, Moon,
  HardDrive, Wifi, Clock, Menu, X
} from 'lucide-react';
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
        <span className="text-xl font-bold text-gradient">Create MC</span>
      </div>

      {/* Desktop links */}
      <div className="nav-links flex items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
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
  <div className="flex-col items-center text-center animate-enter delay-100 mt-12">
    <div className="badge mb-6">
      <Sparkles size={16} /> <span>Servidor Privado 1.21.1 Create</span>
    </div>
    <h1 className="text-gradient">Bienvenido a la Aventura</h1>
    <p className="text-secondary mb-8 max-w-2xl text-lg mx-auto">
      Descarga los modpacks, conéctate a nuestro servidor y explora un mundo lleno de posibilidades con Create mod y mucho más.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn btn-primary" onClick={() => setActiveTab('modpacks')}>
        <Download size={20} /> Descargar Modpacks
      </button>
      <button className="btn btn-outline" onClick={() => setActiveTab('servidor')}>
        <Server size={20} /> Info del Servidor
      </button>
    </div>
  </div>
);

const ServerTab = () => {
  const [copied, setCopied] = useState(false);
  const [serverStats, setServerStats] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const ip = "141.253.109.219";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://mc-status-proxy.igl2005.workers.dev/');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setServerStats(data);
      } catch (error) {
        setStatsError("No se pudo conectar con el servidor.");
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Actualiza cada 10s
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-enter delay-100 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-gradient">Nuestro Servidor</h2>
        <p className="text-secondary text-lg">Únete a nosotros para la mejor experiencia survival.</p>

        {/* Live Server Status Widget */}
        <div className={`server-widget ${serverStats?.estado_maquina === 'running' ? 'online' : 'offline'}`}>

          <div className="server-widget-header">
            <div className="flex items-center gap-4">
              <div className="status-indicator">
                {serverStats?.estado_maquina === 'running' && <span className="status-ping"></span>}
                <span className={`status-dot ${serverStats?.estado_maquina === 'running' ? 'online' : 'offline'}`}></span>
              </div>
              <h3 className={`status-title ${serverStats?.estado_maquina === 'running' ? 'online' : 'offline'}`}>
                {serverStats ? (serverStats.estado_maquina === 'running' ? 'Servidor Online' : 'Servidor Offline') : 'Conectando...'}
              </h3>
            </div>

            {serverStats && serverStats.estado_maquina === 'running' && (
              <div className="uptime-badge">
                <Clock size={16} className="text-blue-400" />
                <span>Tiempo activo: <span className="text-white font-medium">{serverStats.tiempo_encendido}</span></span>
              </div>
            )}
          </div>

          {serverStats && serverStats.estado_maquina === 'running' && (
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
                  {(parseFloat(serverStats.cpu_uso) / 4).toFixed(1)}% <span className="stat-unit">/ 100%</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-label">
                  <Server size={18} /> RAM
                </div>
                <div className="stat-value">
                  {(parseFloat(serverStats.ram_mb) / 1024).toFixed(1)} <span className="stat-unit">/ 24 GB</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-label">
                  <HardDrive size={18} /> Disco
                </div>
                <div className="stat-value">
                  {(parseFloat(serverStats.disco_mb) / 1024).toFixed(1)} <span className="stat-unit">GB</span>
                </div>
              </div>

              <div className="stat-card wide">
                <div className="stat-label">
                  <Wifi size={18} /> Red
                </div>
                <div className="w-full mt-3 px-1">
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <span className="stat-unit" style={{fontSize: '0.75rem', opacity: 0.8}}>Bajada:</span>
                    <span className="text-white" style={{fontSize: '0.9rem', fontWeight: 600}}>{parseFloat(serverStats.red_bajada_kb).toFixed(0)} <span className="stat-unit" style={{fontSize: '0.7rem', fontWeight: 400}}>KB/s</span></span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="stat-unit" style={{fontSize: '0.75rem', opacity: 0.8}}>Subida:</span>
                    <span className="text-white" style={{fontSize: '0.9rem', fontWeight: 600}}>{parseFloat(serverStats.red_subida_kb).toFixed(0)} <span className="stat-unit" style={{fontSize: '0.7rem', fontWeight: 400}}>KB/s</span></span>
                  </div>
                </div>
              </div>

            </div>
          )}
          {statsError && <div className="mt-4 text-center"><span className="text-sm text-red-400 font-medium bg-red-500/10 px-4 py-2 rounded-xl">{statsError}</span></div>}
        </div>

        <div className="ip-box" onClick={handleCopy} title="Haz clic para copiar">
          {ip}
          {copied ? <Check size={24} color="#4ade80" /> : <Copy size={24} />}
        </div>
        {copied && <p className="text-green-400 mt-2 text-sm font-medium">¡IP Copiada al portapapeles!</p>}
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

      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-blue-400" size={32} />
          <h3 className="mb-0">Normas del Servidor</h3>
        </div>
        <div className="rule-item">
          <div className="rule-number">1</div>
          <div>
            <h4 className="mb-1 text-lg">Respeto Mutuo</h4>
            <p className="text-secondary">Trata a todos con respeto. No se tolerará toxicidad, acoso ni insultos.</p>
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-number">2</div>
          <div>
            <h4 className="mb-1 text-lg">No Grifear</h4>
            <p className="text-secondary">Construye, no destruyas. Respeta las construcciones y cofres de los demás jugadores.</p>
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-number">3</div>
          <div>
            <h4 className="mb-1 text-lg">Uso Justo de Recursos</h4>
            <p className="text-secondary">Evita laggear el servidor con máquinas de Create innecesariamente masivas si no estás en línea.</p>
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-number">4</div>
          <div>
            <h4 className="mb-1 text-lg">Divertirse</h4>
            <p className="text-secondary">Es un juego, colabora, crea rutas de trenes y disfruta de la compañía.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceChart = () => {
  const chartData = [
    { name: 'Potato (Optimización)', fps: 130, color: 'bg-green-400', width: '92%' },
    { name: 'Server (Base)', fps: 90, color: 'bg-blue-400', width: '64%' },
    { name: 'Low (Shaders Ligeros)', fps: 48, color: 'bg-yellow-400', width: '34%' },
    { name: 'High (Ultra Shaders)', fps: 12, color: 'bg-red-400', width: '8%' }
  ];

  return (
    <div className="mt-6 p-5 rounded-xl border border-blue-500/20 bg-slate-900/50">
      <h4 className="text-lg mb-4 text-white flex items-center gap-2">
        <Zap size={18} className="text-blue-400" />
        Comparativa de Rendimiento
      </h4>
      <div className="space-y-4">
        {chartData.map((data, index) => (
          <div key={index} className="group">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-secondary group-hover:text-white transition-colors">{data.name}</span>
              <span className="font-bold text-white">{data.fps} FPS</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`${data.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: data.width }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-secondary mt-4 text-center opacity-80">
        * Promedios en pruebas con gráficos integrados (1440p)
      </p>
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
        fps: '100-140 FPS (Avg: 130)',
        ram: 'Prueba: 3088 MB',
        gpu: 'AMD Radeon Integrated Graphics',
        usage: 'GPU 55% | CPU 25%',
        dh: 'Desactivado',
        resolution: '1440p'
      },
      downloadUrl: 'https://github.com/iaguito22/minecraftServerWeb/releases/download/v1/potato.zip'
    },
    lowAesthetic: {
      id: 'lowAesthetic',
      title: 'Low Aesthetic (Potato + Shaders)',
      icon: <Eye size={40} className="text-blue-400" />,
      desc: 'Optimización + Distant Horizons (DH) + Shaders ligeros. Una experiencia bonita sin sacrificar tanto rendimiento.',
      features: ['Mods de Optimización', 'Distant Horizons', 'Shaders E-LITE 5.0.1', 'Mejora visual fluida'],
      performance: {
        fps: '39-51 FPS (Avg: 48)',
        ram: 'Prueba: 2720 MB',
        gpu: 'AMD Radeon Integrated Graphics',
        usage: 'GPU 80% | CPU 16%',
        dh: 'Activado',
        resolution: '1440p'
      },
      downloadUrl: 'https://github.com/iaguito22/minecraftServerWeb/releases/download/v1/low.zip'
    },
    highAesthetic: {
      id: 'highAesthetic',
      title: 'High Aesthetic (Ultra)',
      icon: <Sparkles size={40} className="text-blue-400" />,
      desc: 'La experiencia definitiva. Optimización + DH + Shaders en High. Visuales impresionantes, requiere PC potente.',
      features: ['Mods de Optimización', 'Distant Horizons', 'Shaders Solas V3.6', 'Visuales impresionantes'],
      performance: {
        fps: '10-14 FPS (Avg: 12)',
        ram: 'Prueba: 2722 MB',
        gpu: 'AMD Radeon Integrated Graphics',
        usage: 'GPU 100% | CPU 20%',
        dh: 'Activado',
        resolution: '1440p'
      },
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
          <div key={key} className="glass-card cursor-pointer" onClick={() => openDetail(key)}>
            <div className="mb-6">{packs[key].icon}</div>
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
      <div className="animate-enter max-w-3xl mx-auto glass-card relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>

        <button
          className="btn btn-outline mb-8 w-max"
          onClick={() => setView(selectedPack.title.includes('Servidor') ? 'main' : 'client')}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-blue-900/30 rounded-2xl border border-blue-500/20">
            {selectedPack.icon}
          </div>
          <div>
            <h2 className="mb-1 text-3xl">{selectedPack.title}</h2>
            <div className="badge">1.21.1 / NeoForge</div>
          </div>
        </div>

        <p className="text-lg text-secondary mb-8">{selectedPack.desc}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl mb-4 flex items-center gap-2"><Check className="text-blue-400" /> Contenido</h4>
            <ul className="feature-list">
              {selectedPack.features.map((f, i) => (
                <li key={i}><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> {f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-4 flex items-center gap-2"><Cpu className="text-blue-400" /> Rendimiento</h4>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
              <div className="mb-3">
                <div className="text-sm text-secondary mb-1">FPS Estimados</div>
                <div className="font-semibold text-blue-300">{selectedPack.performance.fps}</div>
              </div>
              <div className={selectedPack.performance.gpu ? "mb-3" : ""}>
                <div className="text-sm text-secondary mb-1">{selectedPack.performance.gpu ? "RAM (Prueba)" : "RAM Recomendada"}</div>
                <div className="font-semibold text-blue-300">{selectedPack.performance.ram}</div>
              </div>
              {selectedPack.performance.gpu && (
                <>
                  <div className="mb-3">
                    <div className="text-sm text-secondary mb-1">Hardware de Prueba</div>
                    <div className="font-semibold text-blue-300">{selectedPack.performance.gpu} ({selectedPack.performance.resolution})</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-secondary mb-1">Uso del Sistema</div>
                    <div className="font-semibold text-blue-300">{selectedPack.performance.usage}</div>
                  </div>
                  <div>
                    <div className="text-sm text-secondary mb-1">Distant Horizons</div>
                    <div className="font-semibold text-blue-300">{selectedPack.performance.dh}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Pruebas de rendimiento */}
        <div className="max-w-2xl mx-auto mb-8">
          <PerformanceChart />
        </div>

        <div className="mt-4">
          <a
            href={selectedPack.downloadUrl}
            download={`${selectedPack.id}_pack.zip`}
            className="btn btn-primary w-full py-4 text-lg"
          >
            <Download size={24} /> Descargar {selectedPack.title}.zip
          </a>
          <button
            onClick={() => setActiveTab('acerca')}
            className="btn btn-outline w-full mt-6"
          >
            <Info size={18} /> ¿Cómo lo instalo?
          </button>
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
  <div className="animate-enter delay-100 max-w-3xl mx-auto text-center">
    <div className="bg-blue-600/10 p-6 rounded-full mb-6 w-max mx-auto">
      <Info size={48} className="text-blue-400" />
    </div>
    <h2 className="text-gradient mb-6">Acerca de la Web</h2>
    <p className="text-secondary text-lg mb-8">
      Esta web fue creada para facilitar la instalación y actualización de los modpacks para nuestro servidor privado de Minecraft 1.21.1 con Create Mod.
    </p>
    <div className="glass-card">
      <div className="flex flex-col md:flex-row gap-8 text-left justify-around">
        <div>
          <h4 className="text-blue-400 mb-2 font-bold">¿Cómo instalo el modpack?</h4>
          <p className="text-sm text-secondary leading-relaxed">
            1. Descarga el .zip correspondiente.<br />
            <strong className="text-blue-400">2. IMPORTANTE: Ve a tu carpeta <code className="bg-white/10 px-1 rounded">.minecraft</code> y ELIMINA tu carpeta <code className="bg-white/10 px-1 rounded">mods</code> actual para evitar incompatibilidades.</strong><br />
            3. Descomprime el .zip directamente en la carpeta principal <code className="bg-white/10 px-1 rounded">.minecraft</code>.<br />
            4. Sobrescribe los archivos y carpetas cuando te lo pregunte, ¡y listo para jugar!
          </p>
        </div>
        <div>
          <h4 className="text-blue-400 mb-2 font-bold">Contacto</h4>
          <p className="text-sm text-secondary">
            Si tienes problemas con la instalación o algún crasheo, contacta con el admin en Discord.
          </p>
        </div>
      </div>
    </div>
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

      <footer className="w-full text-center text-secondary text-sm py-4 border-t border-white/5 bg-slate-900/30 backdrop-blur-md mt-auto">
        <p>© 2026 Create Server - Modpack Hub. Creado para la comunidad.</p>
      </footer>
    </div>
  );
}

export default App;
