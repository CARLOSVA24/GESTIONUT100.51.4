console.log("Registro de Delitos v2.0 Loaded");
// Configuración Inicial
const GYE_COORDS = [-2.1894, -79.8891];
const ZOOM_LEVEL = 12;

// Colores por delito para el mapa de calor
const CRIME_COLORS = {
    robo: '#0ea5e9',
    sicariato: '#ef4444',
    extorsion: '#22c55e',
    droga: '#f59e0b',
    operacion: '#8b5cf6'
};

// --- SOLUCIÓN DEFINITIVA: Logo Institucional Embebido ---
const INSTITUTIONAL_LOGO_BASE64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCABBAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9UjWZqWpWukWM95eXENrawx+ZLPPJ5aRr/eZjU11e2+n20k9xMkEEC+Y8jfKqrXj+m6ZP8bdWt/EGuWssXg+3cz6JpEhwl6w/1d9cp35/1cTfdwHPzEbABniX4x6nqGnvc+GbNbSweTyLbX9bt5fKnkyf+PW0T97dco542fJ86F1rk/Eeu2dppGgap4g8aeIfEWmavqb6fLPYz/2XHYSJv3v5cSpIY0eNwfMc7EV33/JUPh6DxN4z8DPpfxAube/tra8kiguWt/st6J7SblpIUTYYXdJFTy15iC53eY1dvb+AZTeXCWmhWGj6b9rkvWMkKkSymHyTIqnPlqY8oWXaWEjfdoA4C31Lw3c+CbjWoj4nl1Rr37Fp+lweMNQL3LvEssG+TzfkzE6Svw+xM/e21spql1Y+EPCureGPF+v2j63Zf2ja6Zq0P9rrBH5aPI06n/SXjjyiZSTO90rv08J3lu4vI9ctIYQ2Uf59nTHTzNnTj6IKw774fXNnrMurhbgXLJLbQ3OnTrF5VvIRI8YQJ8hkcD958z/7VAF3Tvi02mwafN4vtI9Psb4R/ZvEemTefpNwG/1chk+9CW9JPk+cLvavXwVIBHIPIIr5/it/EkPivwf4a0lrD/hAYd1pPo9nbfvbazjhfYLky7/MRnREzHt5J+9/D0VssvwX1eOEzyzeA9Rulhh3As2iTP0TPe2fsf8All0Py42AHsNFIORxRQB5J8WpD4q1bw/4EWaRY9Ylku9SWNfkbT4GjMsbt23vJDEU6sryEdK7zxLrUPhnR2lQxRvtEUEbEIm7HAFcn4dlOqfGzxrdAg29lYadp6qef3wM8r/pLF/3yK0/FUsd74q0bTSyhg/mbHwd/Jfv/wBcjQBkWmna5ZxRa1aaNDrGr3HDPeTpbGKP1ICHLV4p8S/Cvxm124S4vCtjoluI5nsdOu1YbcSblcbcuMOEMfRyOCteufGjxxL4U/sZLd7p5Lm4kV4LdgpuIxH8yNn7p/u/Q1yWh+Kp/iB47njvJLiGxuLG5srNNMuS1wsL7d0qlcBSDG37w8/MmOooA8m8VeJNc8LfCK306e1n1OD7WY11ayZJbied0wiJbg7pI5D8oYNu2c4rs/hdoPxn8H3cGy0N5pzIDLY6pMkQg+VMeUMsV6HGfu991a/hRvA3gHxjY2Nto+rW15aW1vi91O2eeSJWxHEX5JVuSN+B/qyOnNb+rfEWfwp4112VDdX1ldkq9jHhJYpYoygCZ6tIVX5unzJ6igDqhp2oaclxr8umx6JqISJLiKG6+0LJFHI0n8Kr/wA9HrrtQ0/TvHHh6ezvI1udM1C3kgmibkPGw2suex5rA+GnipfGGi300901xK11JC8TD/Vjj5F9V960/AxaKzubR7qK4mhl+cQrsVPwP0oAw/hDf6m/hi78P6nPPJq3hq6bSZL65ffJcxoEaGZm6F3heNn9GJFFSaa1zpnxp8TqybtPvNFsLiKBByZlmuElbH+6YfyooA50+J9O+HvxW+IN1qsrxWM1npN8rIhbzJJXlthGijksWjQf8DFRR+MYvE/irSdUi0bVtLukk8r7LrdsbS4jTp5qK3Rdksx5/wCeR/u8r8cNJgstZ8PeK7ne2mRb9G1VoiAIrW5eMx3Q9GhuEhIY/dUyMMc1wIvdSu9U1Pw/YabqWs2c1zMsniDXLtri9nljPkMUijUKkMe5MrJt3JLvUN1oAz/jSNVutbuIhZxrqOmzm7AmuFhjuVVt6OGydrYYBl75XHQ1X+FHiHxH4J0+C9Xwrc6hdyagkd1Z6eiz3VtZOPlZYlPPlHylHPzLvPavYYbOLxjpT6fdwW//AAlNvaBw06jbJIeACD1xtIOehzt4rxfTPA/jbTPGUWpWGiahol9CgRZs+ZZOoGBtkUtxg4+YbfmPNAGn4L+L2m6f8YPiLr+oJrWmyi2sbCG0122FnNOo82TMCHLTYeV1f+7sX1qD4j61rl1c6XrEGjhPEdxFFPqWkF/39s/7uRYXbpwuxd44zGa057H4rz3un6ze+H9HkuLYOlpqkkcT3lnG2/LeaeFVtqZ2AMe9YWgfDfxTqXit5r7R9Y1F72TMlzqM7LboOxVlG7YeeHwPTNAHafAhz4Wkh0i5hea5QNLd3TTeZHBGnmSHZIvB+d8H2IrrtN+Jfh7wtMJtf1D+z5r6YSK5y6qH5TLqD99g6j12t6VFrUmk+F9H1HRtKa2gSKJ5dRlkcIRCi+Yfurt5HZf4eOtcm2mW1t4s0681M6v4IurDTjq0clzNBNY3cEG9ZJJYV+64+05IYgAykjkUAeg+HtRbxB8b/EEtvIDp1joOnrBcKPlEs0tyzqfoiRH/AIGKKd8GbC6l8NX3iG/hlj1DxDePqZtwoQwwHEdvFtPQrDHFkeu71ooA9G1LSLLVdOurG8torizuojBLDIgZJIyCCjA8EEEjB45r511d9a+HGn3fhCO8OntqMscWk+Ij8kt1brgNZtM/yi+ES7YpH4YBDltjAfTNY3iLwxpHirSrjTtX0+31GxugokhuYlkU4YMuQR2YAj0IzQBxPibw5oWg+EDqFyz6Nb6LZrObqUvI0cMSE/PzvkKqSASSSTWR4e8Z3s2gyzo41w2xRjFqURhuNj/cMq7c7/vdVUfMO3zVmeM/hh4gk0G70LTLyXxB4YlZAdJ1W5MVzCY3EitHckSeYg2ACKZG8xmO5ynFcvqdxZpoWh+Hb/w5qujpaXa3Uujarokk2nXUSo8SxzvbrJbxoN0b/L8oMeTGtAHrQ8a6xPDC40SOVW3jzI2eSNSu7nIXn7v8Pr7Vk6945l0KLTH1u6s/DGn6hdCwgkbLLuKM4jG37vCNuL7QuDjNcU+s+H7C28NTaNqnh3T9R8P6pLfHRNJuZGtpUeGaARoI13KuJUk2iLGUJxzurNtlHinQdJ02Hwpr/iu8s9avdVeK6tJNMss3LzlopzdKjSwqtyQRGjFgMbMUAa+s65q+n+Jb/Q5bhY7sTxNZabLB5lvq+nOY1ndm6hY1ZgcAeWAGbcGVinhTwXpHj3WoxpFpLb+B7QpFJeT3Ms51gxYKW8TSEs1qpXc20jzHUKcqpz0OjfB/UdXgisvFd+jaBAMW/hTS3kFjGvUpNKx3XAydu07E28eXivZoLK3t7eKCK3iigiUIkSIAqKOgAHAAx0oAk8pCB8i9AOlFPooAKaegoooArH/UJ9P/AGWpX6N/ntRRQBkQf8fT/wC8n8q0pP8AXSfRv5LRRQBMeo+lS0UUAFFFFAH/2Q==";

// Estado de la Aplicación
let crimes = JSON.parse(localStorage.getItem('gyecrimes')) || [];
let personnel = JSON.parse(localStorage.getItem('gyepersonal')) || [];
let selectedLatLng = null;
let editingId = null;
let editingPersonnelId = null;
let map;
let kmzLayer = null;
let kmzControl = null;
let drawnItems = null; // Capa para objetos dibujados manualmente
let markerLayer = null; // Capa para marcadores individuales de incidentes
let currentPropertyLayer = null; // Capa que se está editando actualmente
const heatLayers = {};
const incidentMarkers = {}; // Almacenamiento de referencias a marcadores para acceso rápido
let crimeChart = null; // Instancia del gráfico
let guardAssignments = JSON.parse(localStorage.getItem('guardAssignments')) || [];
let specialAssignments = JSON.parse(localStorage.getItem('specialAssignments')) || [];
let selectedWatchGroup = localStorage.getItem('selectedWatchGroup') || null;
let baborPersonnel = JSON.parse(localStorage.getItem('baborPersonnel')) || [];
let estriborPersonnel = JSON.parse(localStorage.getItem('estriborPersonnel')) || [];
let opsEvents = JSON.parse(localStorage.getItem('opsEvents')) || [];
let instantOps = JSON.parse(localStorage.getItem('instantOps')) || [];
let patrolOrders = JSON.parse(localStorage.getItem('patrolOrders')) || [];
let vehicles = JSON.parse(localStorage.getItem('gyevehicles')) || [];
let operationName = localStorage.getItem('operationName') || "S/N";
let externalOrdersMetadata = JSON.parse(localStorage.getItem('externalOrdersMetadata')) || [];
let currentInstantOpsPhotos = [];
let editingInstantOpId = null;
let escudoBase64 = null; // Se carga al inicio

// --- INDEXED DB HELPER (Para PDFs Externos) ---
const DB_NAME = 'OrderRepositoryDB';
const STORE_NAME = 'orders';
let db;

const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };
        request.onerror = (e) => reject(e);
    });
};

const saveOrderToDB = (id, blob) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ id, blob });
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
};

const getOrderFromDB = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);
        request.onsuccess = (e) => resolve(e.target.result ? e.target.result.blob : null);
        request.onerror = (e) => reject(e);
    });
};

const deleteOrderFromDB = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
};

initDB().then(() => console.log("IndexedDB Initialized")).catch(err => console.error("IDB Fail:", err));

// Migración de Datos (Asegurar IDs)
patrolOrders.forEach(op => { if (!op.id) op.id = 'ordpat_' + Math.random().toString(36).substr(2, 9); });

const CATEGORY_GRADIENTS = {
    robo: { 0.2: 'white', 0.5: '#38bdf8', 0.8: '#0ea5e9', 1.0: '#0284c7' },       // Azul
    sicariato: { 0.2: 'white', 0.5: '#f87171', 0.8: '#ef4444', 1.0: '#b91c1c' },  // Rojo
    extorsion: { 0.2: 'white', 0.5: '#4ade80', 0.8: '#22c55e', 1.0: '#15803d' },  // Verde
    droga: { 0.2: 'white', 0.5: '#fcd34d', 0.8: '#f59e0b', 1.0: '#d97706' },      // Naranja
    operacion: { 0.2: 'white', 0.5: '#c084fc', 0.8: '#8b5cf6', 1.0: '#6d28d9' }   // Violeta
};

// Inicialización
// --- MASTER MENU DELEGATION (Fix for unresponsive menus) ---
document.addEventListener('click', (e) => {
    // 1. Sidebar Accordion (menu-btn)
    const menuBtn = e.target.closest('.sidebar-menu .menu-btn');
    if (menuBtn) {
        const targetId = menuBtn.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        const isActive = menuBtn.classList.contains('active');

        // Close all others
        document.querySelectorAll('.sidebar-menu .menu-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.sidebar-menu .menu-content').forEach(c => c.classList.remove('active'));

        if (!isActive) {
            menuBtn.classList.add('active');
            if (targetContent) targetContent.classList.add('active');
        }
        return;
    }

    // 2. Sub-menu View Switching (sub-menu-btn)
    const subBtn = e.target.closest('.sub-menu-btn');
    if (subBtn) {
        const viewId = subBtn.getAttribute('data-view');
        
        // Update button states
        const parentMenu = subBtn.closest('.sub-menu');
        if (parentMenu) {
            parentMenu.querySelectorAll('.sub-menu-btn').forEach(b => b.classList.remove('active'));
        }
        subBtn.classList.add('active');

        // Toggle Views
        const allViews = [
            'personnelView', 'distributionView', 'personnelStatsView', 'watchDivisionView',
            'opsPlanningView', 'ordpatView', 'loadOrdersView', 'instantOpsView',
            'historicalPatrolView', 'operationalReportsView', 'logisticsView',
            'crimesTableWrapper', 'inteligenciaFormView'
        ];

        allViews.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (id === viewId) ? (id === 'loadOrdersView' ? 'flex' : 'block') : 'none';
        });

        // Trigger specific re-renders
        if (viewId === 'personnelStatsView') updatePersonnelStats();
        if (viewId === 'watchDivisionView') renderWatchDivision();
        if (viewId === 'historicalPatrolView') renderHistoricalPatrolTable();
        if (viewId === 'ordpatView') { renderORDPATTable(); if(typeof prefillORDPATFormWithLast === 'function') prefillORDPATFormWithLast(); }
        if (viewId === 'opsPlanningView') renderOpsPlanningTable();
        if (viewId === 'instantOpsView') renderInstantOpsTable();
        
        // Fullscreen logic
        const tableOverlay = document.querySelector('.table-overlay');
        const mapArea = document.querySelector('.map-area');
        if (tableOverlay) {
            const isMapArea = (viewId === 'inteligenciaFormView' || !viewId);
            tableOverlay.classList.toggle('fullscreen', !isMapArea);
            if (mapArea) mapArea.style.display = isMapArea ? 'block' : 'none';
        }
        
        e.preventDefault();
        return;
    }
    // 3. Top Nav Dropdowns
    const topNavBtn = e.target.closest('.top-nav .nav-btn');
    if (topNavBtn) {
        const navItem = topNavBtn.closest('.nav-item');
        const dropdown = navItem ? navItem.querySelector('.dropdown-content') : null;
        if (dropdown) {
            const isShown = dropdown.classList.contains('show');
            // Close others first
            document.querySelectorAll('.dropdown-content.show').forEach(d => d.classList.remove('show'));
            document.querySelectorAll('.nav-btn.active').forEach(b => b.classList.remove('active'));
            
            if (!isShown) {
                dropdown.classList.add('show');
                topNavBtn.classList.add('active');
            }
        }
        e.preventDefault();
        return;
    }

    // Cerrar dropdowns al hacer clic fuera
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.dropdown-content.show').forEach(d => d.classList.remove('show'));
        document.querySelectorAll('.nav-btn.active').forEach(b => b.classList.remove('active'));
    }
});

// Inicialización Resiliente
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("Initializing app...");
        if (typeof initMap === 'function') initMap();
        if (typeof updateUI === 'function') updateUI();
        if (typeof setupEventListeners === 'function') setupEventListeners();
        
        renderTable();
        renderPersonnelTable();
        updateDashboard();
        updatePersonnelStats();
        renderOpsPlanningTable();
        renderInstantOpsTable();
        renderORDPATTable();
        renderVehiclesTable();
        
        if (typeof setupTopNav === 'function') setupTopNav();
        if (typeof setupWatchSearch === 'function') setupWatchSearch();

    } catch (err) {
        console.error("Critical Init Error:", err);
    }
});

// --- NUEVO: Lógica de Menú Superior (Click to toggle) ---
function setupTopNav() {
    console.log("Setting up Top Nav...");
    const navBtns = document.querySelectorAll('.top-nav .nav-btn');

    if (navBtns.length === 0) {
        console.warn("No nav buttons found in .top-nav");
        return;
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Buscar el dropdown-content hermano del botón
            const navItem = btn.closest('.nav-item');
            const dropdown = navItem ? navItem.querySelector('.dropdown-content') : null;

            if (dropdown) {
                const alreadyOpen = dropdown.classList.contains('show');

                // Toggle el actual
                dropdown.classList.toggle('show');
                btn.classList.toggle('active');

                console.log(`Dropdown ${btn.textContent.trim()} toggled. Status: ${!alreadyOpen}`);
            } else {
                console.error("Dropdown content not found for button", btn);
            }
        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            const openDropdowns = document.querySelectorAll('.dropdown-content.show');
            const activeBtns = document.querySelectorAll('.nav-btn.active');

            if (openDropdowns.length > 0 || activeBtns.length > 0) {
                openDropdowns.forEach(d => d.classList.remove('show'));
                activeBtns.forEach(b => b.classList.remove('active'));
                console.log("Closed all dropdowns (click outside)");
            }
        }
    });
}

function initMap() {
    // Inicializar mapa centrado en Guayaquil
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true // Mejor rendimiento para KMZ/KML pesados
    }).setView(GYE_COORDS, ZOOM_LEVEL);

    // Capa de mapa (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Mover control de zoom a la derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Inicializar capas de calor
    refreshHeatLayer();

    // Inicializar capa de marcadores
    markerLayer = L.layerGroup().addTo(map);
    refreshMarkers();

    // Control de capas (para gestionar las capas KMZ que se añadan)
    kmzControl = L.control.layers(null, null, {
        collapsed: false,
        position: 'topleft'
    }).addTo(map);

    kmzControl.addOverlay(markerLayer, "Marcadores de Incidentes");

    // Evento clic en el mapa para seleccionar ubicación
    map.on('click', (e) => {
        selectedLatLng = e.latlng;

        // Actualizar displays si existen (Inteligencia)
        if (document.getElementById('lat')) document.getElementById('lat').textContent = `Lat: ${selectedLatLng.lat.toFixed(5)}`;
        if (document.getElementById('lng')) document.getElementById('lng').textContent = `Lng: ${selectedLatLng.lng.toFixed(5)}`;

        // Marcador temporal
        L.circleMarker(selectedLatLng, {
            radius: 8,
            fillColor: "#38bdf8",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map).fadeOut(2000);
    });
}

function setupEventListeners() {
    const form = document.getElementById('crimeForm');
    if (form) form.addEventListener('submit', handleFormSubmit);

    const personnelForm = document.getElementById('personnelForm');
    if (personnelForm) personnelForm.addEventListener('submit', handlePersonnelSubmit);

    // Importación Excel de Personal
    const btnImportPersExcel = document.getElementById('importPersonnelExcel');
    const inputPersExcel = document.getElementById('personnelExcelFile');
    const btnDownloadPersTemplate = document.getElementById('downloadPersonnelTemplate');

    if (btnImportPersExcel && inputPersExcel) {
        btnImportPersExcel.addEventListener('click', (e) => {
            e.preventDefault();
            inputPersExcel.click();
        });
        inputPersExcel.addEventListener('change', handlePersonnelExcelImport);
    }

    const personnelSearchInput = document.getElementById('personnelSearchInput');
    if (personnelSearchInput) {
        personnelSearchInput.addEventListener('input', (e) => {
            renderPersonnelTable(e.target.value.toLowerCase());
        });
    }

    const clearFoBtn = document.getElementById('clearFoBtn');
    const newFoBtn = document.getElementById('newFoBtn');

    if (clearFoBtn) {
        clearFoBtn.addEventListener('click', () => {
            showNotification('Formulario de Orden Fragmentaria limpiado');
        });
    }

    if (newFoBtn) {
        newFoBtn.addEventListener('click', () => {
            const createNewFromBase = (baseOrder) => {
                const newId = 'frag_' + Date.now();

                const newFo = JSON.parse(JSON.stringify(baseOrder || {}));
                newFo.id = newId;
                newFo.numero = seqStr;
                newFo.estado = 'abierta';
                newFo.timestamp = new Date().toISOString();

                saveData();

                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                showNotification(`Nueva Orden de Patrulla ${seqStr} generada y lista para editar`);
            };

            if (closedOrders.length > 0) {
                const latest = [...closedOrders].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                createNewFromBase(latest);
                createNewFromBase(latest);
            } else {
                const newId = 'frag_' + Date.now();

                const blankFo = {
                    id: newId,
                    numero: seqStr,
                    estado: 'abierta',
                    timestamp: new Date().toISOString()
                };
                saveData();

                showNotification('Iniciando Nueva Orden (No hay registros previos)');
            }
        });
    }

    const clearPersBtn = document.getElementById('clearPersonnelData');
    if (clearPersBtn) {
        clearPersBtn.addEventListener('click', () => {
            if (personnel.length === 0) {
                showNotification('No hay registros de personal para eliminar.');
                return;
            }
            if (confirm('¿Está seguro de eliminar TODOS los registros de personal? Esta acción no se puede deshacer.')) {
                personnel = [];
                saveData();
                renderPersonnelTable();
                updatePersonnelStats();
                showNotification('Todos los registros de personal han sido eliminados.');
            }
        });
    }

    const clearBtn = document.getElementById('clearData');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas borrar todos los registros de incidentes?')) {
                crimes = [];
                editingId = null;
                resetForm();
                saveData();
                refreshHeatLayer();
                updateUI();
                renderTable();
                showNotification('Todos los incidentes borrados');
            }
        });
    }

    // Eventos de Exportación
    const btnExcel = document.getElementById('exportExcel');
    if (btnExcel) btnExcel.addEventListener('click', exportToExcel);

    const btnPDF = document.getElementById('exportPDF');
    if (btnPDF) btnPDF.addEventListener('click', exportToPDF);

    // Evento de Carga KMZ
    const kmzInput = document.getElementById('kmzFile');
    if (kmzInput) kmzInput.addEventListener('change', handleKMZUpload);

    // --- Cargar escudo como base64 para PDF ---
    (function loadEscudo() {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            escudoBase64 = canvas.toDataURL('image/jpeg');
        };
        img.onerror = function () { escudoBase64 = null; };
        img.src = 'ESCUDOARMADA.jpg?' + Date.now();
    })();

    // --- Partes al Instante ---
    const instantOpsForm = document.getElementById('instantOpsForm');
    if (instantOpsForm) instantOpsForm.addEventListener('submit', handleInstantReportSubmit);

    const ioPhotosInput = document.getElementById('ioPhotosInput');
    if (ioPhotosInput) {
        ioPhotosInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            const previewContainer = document.getElementById('ioPhotosPreview');
            // Removed clearing to allow appending multiple times
            // previewContainer.innerHTML = '';
            // currentInstantOpsPhotos = [];

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    currentInstantOpsPhotos.push(base64);

                    const img = document.createElement('img');
                    img.src = base64;
                    img.style.height = '60px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '4px';
                    img.style.border = '1px solid var(--border)';
                    previewContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        });
    }

    // Populate Anexo B puesto selector whenever the instantOpsView becomes visible
    populateAnexoBPuestosSelector();

    // --- Botón Nuevo Parte (limpia el formulario completamente) ---
    const btnNuevoParte = document.getElementById('btnNuevoParte');
    if (btnNuevoParte) {
        btnNuevoParte.addEventListener('click', () => {
            // Reset form fields
            const form = document.getElementById('instantOpsForm');
            if (form) form.reset();
            document.getElementById('ioResultadosRich').innerHTML = '';
            document.getElementById('ioDondeManual').value = '';
            document.getElementById('ioLatInput').value = '';
            document.getElementById('ioLngInput').value = '';
            document.getElementById('ioDate').value = '';
            document.getElementById('ioPrecedencia').value = 'U';
            document.getElementById('ioLugar').value = 'GUAYAQUIL';
            document.getElementById('ioDestinatario').value = 'COOPNA';
            document.getElementById('ioBTNarrative').value = 'BT. CÚMPLEME INFORMAR A USTED SEÑOR ALMIRANTE, LA NOVEDAD SUSCITADA EN LA JURISDICCIÓN DEL GT-100.51 "SEGURIDAD MARÍTIMA", SEGÚN EL SIGUIENTE DETALLE:';
            // Clear photos
            currentInstantOpsPhotos = [];
            const previewEl = document.getElementById('ioPhotosPreview');
            if (previewEl) previewEl.innerHTML = '';
            // Clear Anexo B
            const puestosEl = document.getElementById('ioPuestosSelector');
            if (puestosEl) puestosEl.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
            updateAnexoBPreview();
            // Clear editing state
            editingInstantOpId = null;
            updateOfficialReportNum();
            showNotification('Formulario limpio — listo para nuevo Parte Oficial');
        });
    }

    const vehicleForm = document.getElementById('vehicleForm');
    if (vehicleForm) vehicleForm.addEventListener('submit', handleVehicleSubmit);

    const btnClearVehicles = document.getElementById('clearVehiclesData');
    if (btnClearVehicles) {
        btnClearVehicles.addEventListener('click', () => {
            if (confirm('¿Confirmas que deseas eliminar TODOS los vehículos registrados?')) {
                vehicles = [];
                saveData();
                renderVehiclesTable();
                showNotification('Inventario de vehículos vaciado.');
            }
        });
    }

    const btnExportVehicles = document.getElementById('exportVehiclesExcel');
    if (btnExportVehicles) btnExportVehicles.addEventListener('click', exportVehiclesToExcel);

    const btnExportInstant = document.getElementById('exportOpsInstantExcel');
    if (btnExportInstant) btnExportInstant.addEventListener('click', exportOpsInstantToExcel);

    const btnExportInstantPDF = document.getElementById('exportOpsInstantPDF');
    if (btnExportInstantPDF) btnExportInstantPDF.addEventListener('click', exportOpsInstantToPDF);

    const ioDateInput = document.getElementById('ioDate');
    if (ioDateInput) {
        const now = new Date();
        ioDateInput.value = now.toISOString().slice(0, 16);
        updateOfficialReportNum();
    }

    // --- CONFIGURACIÓN DE DIBUJO ---
    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    kmzControl.addOverlay(drawnItems, "Dibujos Manuales");

    // Configurar Handlers de Dibujo
    const drawOptions = {
        polygon: {
            allowIntersection: false,
            shapeOptions: { color: '#38bdf8', weight: 3 }
        },
        polyline: {
            shapeOptions: { color: '#f59e0b', weight: 3 },
            metric: true, // Forzar metros
            showLength: true
        }
    };

    const polygonDrawer = new L.Draw.Polygon(map, drawOptions.polygon);
    const polylineDrawer = new L.Draw.Polyline(map, drawOptions.polyline);
    const editHandler = new L.EditToolbar.Edit(map, {
        featureGroup: drawnItems
    });

    // Evento cuando se termina de dibujar
    map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        const type = event.layerType;

        // Aplicar color actual del selector
        const currentColor = document.getElementById('polygonColorPicker').value;
        if (layer.setStyle) {
            layer.setStyle({ color: currentColor, fillColor: currentColor, fillOpacity: 0.3 });
        }

        // Añadir evento de clic derecho
        layer.on('contextmenu', (e) => {
            L.DomEvent.stopPropagation(e); // Evitar menú del navegador
            openPropertiesModal(layer);
        });

        if (type === 'polyline') {
            const coords = layer.getLatLngs();
            let distance = 0;
            for (let i = 0; i < coords.length - 1; i++) {
                distance += coords[i].distanceTo(coords[i + 1]);
            }
            layer.bindPopup(`<b>Distancia:</b> ${distance.toFixed(2)} metros`).openPopup();
        }

        drawnItems.addLayer(layer);
        showNotification(`${type.toUpperCase()} creado correctamente`);
    });

    // Lógica del Modal de Propiedades
    const modal = document.getElementById('propertiesModal');
    const closeBtn = document.querySelector('.close-modal');

    function openPropertiesModal(layer) {
        currentPropertyLayer = layer;
        modal.style.display = 'block';

        // Cargar valores actuales
        const props = layer.options || {};
        document.getElementById('propName').value = layer.featureName || "";
        document.getElementById('propColor').value = props.color || "#38bdf8";
        document.getElementById('propOpacity').value = props.fillOpacity || 0.3;

        // Lógica de Edición de Coordenadas
        const coordEditor = document.getElementById('coordEditorContainer');
        const pointsContainer = document.getElementById('polygonPointsContainer');
        pointsContainer.innerHTML = '';

        if (layer.getLatLngs) {
            coordEditor.style.display = 'block';
            let latlngs = layer.getLatLngs();

            // Si el polígono tiene huecos, Leaflet devuelve array de arrays. Tomamos el primero (borde exterior).
            if (latlngs.length > 0 && Array.isArray(latlngs[0])) {
                latlngs = latlngs[0];
            }

            latlngs.forEach((latlng, index) => {
                const row = document.createElement('div');
                row.className = 'coord-row';
                row.innerHTML = `
                    <div class="coord-number">${index + 1}</div>
                    <div class="coord-input-group">
                        <div>
                            <label>Latitud</label>
                            <input type="number" step="0.00001" class="vertex-lat" value="${latlng.lat.toFixed(6)}">
                        </div>
                        <div>
                            <label>Longitud</label>
                            <input type="number" step="0.00001" class="vertex-lng" value="${latlng.lng.toFixed(6)}">
                        </div>
                    </div>
                `;
                pointsContainer.appendChild(row);
            });
        } else {
            coordEditor.style.display = 'none';
        }
    }

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

    document.getElementById('saveProperties').onclick = () => {
        if (!currentPropertyLayer) return;

        const newName = document.getElementById('propName').value;
        const newColor = document.getElementById('propColor').value;
        const newOpacity = parseFloat(document.getElementById('propOpacity').value);

        currentPropertyLayer.featureName = newName;
        if (currentPropertyLayer.setStyle) {
            currentPropertyLayer.setStyle({
                color: newColor,
                fillColor: newColor,
                fillOpacity: newOpacity
            });
        }

        // Aplicar cambios en coordenadas si corresponde
        if (currentPropertyLayer.getLatLngs) {
            const latInputs = document.querySelectorAll('.vertex-lat');
            const lngInputs = document.querySelectorAll('.vertex-lng');
            const newCoords = [];

            latInputs.forEach((latInp, i) => {
                const lat = parseFloat(latInp.value);
                const lng = parseFloat(lngInputs[i].value);
                if (!isNaN(lat) && !isNaN(lng)) {
                    newCoords.push([lat, lng]);
                }
            });

            if (newCoords.length > 0) {
                currentPropertyLayer.setLatLngs(newCoords);
                if (currentPropertyLayer.redraw) currentPropertyLayer.redraw();
            }
        }

        if (newName) {
            currentPropertyLayer.bindPopup(`<b>Sector:</b> ${newName}`);
        }

        modal.style.display = 'none';
        showNotification("Propiedades actualizadas");
    };

    document.getElementById('deleteObject').onclick = () => {
        if (!currentPropertyLayer) return;
        if (confirm("¿Estás seguro de eliminar este objeto?")) {
            drawnItems.removeLayer(currentPropertyLayer);
            modal.style.display = 'none';
            showNotification("Objeto eliminado");
        }
    };

    // Vincular Menú Superior
    const btnDrawPolygon = document.getElementById('drawPolygon');
    if (btnDrawPolygon) {
        btnDrawPolygon.addEventListener('click', (e) => {
            e.preventDefault();
            polygonDrawer.enable();
        });
    }

    const btnDrawPolyline = document.getElementById('drawPolyline');
    if (btnDrawPolyline) {
        btnDrawPolyline.addEventListener('click', (e) => {
            e.preventDefault();
            polylineDrawer.enable();
        });
    }

    const btnEditDrawing = document.getElementById('editDrawing');
    if (btnEditDrawing) {
        btnEditDrawing.addEventListener('click', (e) => {
            e.preventDefault();
            if (editHandler.enabled()) {
                editHandler.disable();
                showNotification("Modo edición desactivado");
            } else {
                editHandler.enable();
                showNotification("Haz clic y arrastra los puntos para modificar");
            }
        });
    }

    const colorPicker = document.getElementById('polygonColorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value;
            // Cambiar color de todos los dibujos actuales
            drawnItems.eachLayer(layer => {
                if (layer.setStyle) layer.setStyle({ color: newColor, fillColor: newColor });
            });
        });
    }

    const btnDrawMeasure = document.getElementById('drawMeasure');
    if (btnDrawMeasure) {
        btnDrawMeasure.addEventListener('click', (e) => {
            e.preventDefault();
            polylineDrawer.enable();
            showNotification("Haz clic en el mapa para medir distancias");
        });
    }

    const btnMenuImportKMZ = document.getElementById('menuImportKMZ');
    if (btnMenuImportKMZ) {
        btnMenuImportKMZ.addEventListener('click', (e) => {
            e.preventDefault();
            if (kmzInput) kmzInput.click();
        });
    }

    const btnMenuSaveData = document.getElementById('menuSaveData');
    if (btnMenuSaveData) {
        btnMenuSaveData.addEventListener('click', (e) => {
            e.preventDefault();
            saveData();
            showNotification("Datos guardados en el almacenamiento local");
        });
    }

    const btnMenuNewDay = document.getElementById('menuNewDay');
    if (btnMenuNewDay) {
        btnMenuNewDay.addEventListener('click', (e) => {
            e.preventDefault();
            activateNewDay();
        });
    }

    const btnMenuExit = document.getElementById('menuExit');
    if (btnMenuExit) {
        btnMenuExit.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("¿Deseas cerrar la aplicación?")) window.close();
        });
    }

    // Toggle Dashboard
    const menuDashboard = document.getElementById('menuDashboard');
    if (menuDashboard) {
        menuDashboard.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDashboard(true);
        });
    }

    const closeDashboard = document.getElementById('closeDashboard');
    if (closeDashboard) {
        closeDashboard.addEventListener('click', () => {
            toggleDashboard(false);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleDashboard(false);
    });


    const btnDivide = document.getElementById('dividePersonnelBtn');
    if (btnDivide) {
        btnDivide.addEventListener('click', () => {
            dividePersonnelIntoGroups();
            renderWatchDivision();
            showNotification('Personal dividido equitativamente');
        });
    }

    document.querySelectorAll('.select-group-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.getAttribute('data-group');
            selectedWatchGroup = group;
            localStorage.setItem('selectedWatchGroup', group);
            renderWatchDivision();
            updatePersonnelStats(); // Update totals immediately
            showNotification(`Grupo ${group.toUpperCase()} seleccionado para distribución`);
        });
    });

    const btnSelectBoth = document.getElementById('selectAllGroupsBtn');
    if (btnSelectBoth) {
        btnSelectBoth.addEventListener('click', () => {
            selectedWatchGroup = 'both';
            localStorage.setItem('selectedWatchGroup', 'both');
            renderWatchDivision();
            updatePersonnelStats(); // Update totals immediately
            showNotification("Ambos grupos seleccionados para distribución");
        });
    }

    // Listener para el botón de generar distribución
    const btnGenDist = document.getElementById('generateDistributionBtn');
    if (btnGenDist) {
        btnGenDist.addEventListener('click', generatePersonnelDistribution);
    }

    const btnExportDistExcel = document.getElementById('exportDistExcelBtn');
    if (btnExportDistExcel) {
        btnExportDistExcel.addEventListener('click', exportDistributionToExcel);
    }

    const btnExportDistPDF = document.getElementById('exportDistPDFBtn');
    if (btnExportDistPDF) {
        btnExportDistPDF.addEventListener('click', exportDistributionToPDF);
    }

    // Establecer fecha por defecto (ahora)
    const dateInput = document.getElementById('date');
    const now = new Date();
    if (dateInput) dateInput.value = now.toISOString().slice(0, 16);

    // Eventos para el nuevo modal de edición de distribución
    const closeEditDist = document.getElementById('closeEditDist');
    if (closeEditDist) {
        closeEditDist.onclick = () => document.getElementById('editDistModal').style.display = 'none';
    }

    const editDistForm = document.getElementById('editDistForm');
    if (editDistForm) {
        editDistForm.addEventListener('submit', handleManualAssignmentSave);
    }

    // --- Eventos de Planificación de Operaciones ---
    const btnAddOps = document.getElementById('addOpsEventBtn');
    if (btnAddOps) btnAddOps.addEventListener('click', () => openOpsModal());

    const btnExportOps = document.getElementById('exportOpsExcelBtn');
    if (btnExportOps) btnExportOps.addEventListener('click', exportOpsToExcel);

    const btnExportOpsPDF = document.getElementById('exportOpsPDFBtn');
    if (btnExportOpsPDF) btnExportOpsPDF.addEventListener('click', exportOpsToPDF);

    const closeOpsModalBtn = document.getElementById('closeOpsModal');
    if (closeOpsModalBtn) closeOpsModalBtn.addEventListener('click', closeOpsModal);

    const cancelOpsBtn = document.getElementById('cancelOpsBtn');
    if (cancelOpsBtn) cancelOpsBtn.addEventListener('click', closeOpsModal);

    const opsEventForm = document.getElementById('opsEventForm');
    if (opsEventForm) opsEventForm.addEventListener('submit', saveOpsEvent);

    // Listeners para auto-completar personal según Distrito y Turno
    const selectOpsDist = document.getElementById('opsDistrito');
    const selectOpsShift = document.getElementById('opsFechaHora');

    if (selectOpsDist) selectOpsDist.addEventListener('change', updateOpsPersonnelAutoFill);
    if (selectOpsShift) selectOpsShift.addEventListener('change', updateOpsPersonnelAutoFill);

    // Cerrar si se hace clic fuera del contenido del modal
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('addOpsEventModal');
        if (e.target === modal) closeOpsModal();
    });

    // --- Órdenes de Patrulla (ORDPAT) ---
    const ordpatForm = document.getElementById('patrolOrderForm');
    if (ordpatForm) {
        ordpatForm.addEventListener('submit', handleORDPATSubmit);

        // Sincronizar encabezado institucional con inputs
        const opFH = document.getElementById('opFH');
        const opMSJ = document.getElementById('opMSJ');
        const dispFH = document.getElementById('displayFH');
        const dispRef = document.getElementById('displayRef');

        if (opFH && dispFH) {
            opFH.addEventListener('input', (e) => {
                dispFH.querySelector('span').textContent = e.target.value || '---';
            });
        }
        if (opMSJ && dispRef) {
            opMSJ.addEventListener('input', (e) => {
                dispRef.querySelector('span').textContent = e.target.value || '---';
            });
        }

        const opNro = document.getElementById('opNroOrden');
        const opID = document.getElementById('opID');
        const dispNro = document.getElementById('displayNro');
        const dispIdCent = document.getElementById('displayIdCentered');

        if (opNro && dispNro) {
            opNro.addEventListener('input', (e) => {
                dispNro.textContent = e.target.value || '---';
            });
        }
        if (opID && dispIdCent) {
            opID.addEventListener('input', (e) => {
                dispIdCent.textContent = (e.target.value || '---').toUpperCase();
            });
        }
    }

    const addOpTareaBtn = document.getElementById('addOpTareaRow');
    if (addOpTareaBtn) {
        addOpTareaBtn.addEventListener('click', () => {
            const tbody = document.getElementById('opTareasBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-patrulla" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-lugar" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-nominativo" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-hora" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-personal" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;"></td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center;"><button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button></td>
            `;
            tbody.appendChild(newRow);
        });
    }

    const addOpOrgBtn = document.getElementById('addOpOrgRow');
    if (addOpOrgBtn) {
        addOpOrgBtn.addEventListener('click', () => {
            const tbody = document.getElementById('opOrgBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-org-unidad" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" placeholder="UT 100.51.4.1 CODESC (-)..."></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-org-oficiales" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" placeholder="01 Oficial"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-org-tripulantes" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" placeholder="06 Tripulantes"></td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center;"><button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button></td>
            `;
            tbody.appendChild(newRow);
        });
    }

    // helper for ORDPAT References
    function updateRowLabelsByTbody(tbodyId) {
        document.querySelectorAll(`#${tbodyId} tr`).forEach((row, index) => {
            const labelCell = row.cells[0];
            if (labelCell) {
                labelCell.textContent = String.fromCharCode(97 + index) + ')';
            }
        });
    }

    function updateOpRefLabels() { updateRowLabelsByTbody('opRefsBody'); }
    function updateFoRefLabels() { updateRowLabelsByTbody('foRefsBody'); }

    function updateFoTareasListLabels() {
        const tbody = document.getElementById('foTareasListBody');
        if (!tbody) return;
        Array.from(tbody.rows).forEach((row, index) => {
            const labelCell = row.cells[0];
            if (labelCell) labelCell.textContent = `${index + 1})`;
        });
    }

    const addOpRefBtn = document.getElementById('addOpRefRow');
    if (addOpRefBtn) {
        addOpRefBtn.addEventListener('click', () => {
            const tbody = document.getElementById('opRefsBody');
            const rowCount = tbody.rows.length;
            const letter = String.fromCharCode(97 + rowCount);
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 5px; width: 30px; text-align: center; color: var(--text-muted); font-family: monospace;">${letter})</td>
                <td style="border: 1px solid var(--border); padding: 0;">
                    <input type="text" class="row-ref-text" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;">
                </td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center; width: 50px;">
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button>
                </td>
            `;
            tbody.appendChild(newRow);
            updateOpRefLabels();
        });
    }

    const addFoRefBtn = document.getElementById('addFoRefRow');
    if (addFoRefBtn) {
        addFoRefBtn.addEventListener('click', () => {
            const tbody = document.getElementById('foRefsBody');
            const rowCount = tbody.rows.length;
            const letter = String.fromCharCode(97 + rowCount);
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 5px; width: 40px; text-align: center; color: var(--text-muted); font-family: monospace;">${letter})</td>
                <td style="border: 1px solid var(--border); padding: 0;">
                    <input type="text" class="row-ref-text" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;">
                </td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center; width: 50px;">
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button>
                </td>
            `;
            tbody.appendChild(newRow);
            updateFoRefLabels();
        });
    }

    const addFoTareaListBtn = document.getElementById('addFoTareaListRow');
    if (addFoTareaListBtn) {
        addFoTareaListBtn.addEventListener('click', () => {
            const tbody = document.getElementById('foTareasListBody');
            const rowCount = tbody.rows.length;
            const num = rowCount + 1;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center; color: var(--text-muted); font-family: monospace;">${num})</td>
                <td style="border: 1px solid var(--border); padding: 0;">
                    <textarea class="row-tarea-desc" rows="2" style="width: 100%; background: transparent; border: none; color: white; padding: 8px; resize: vertical;"></textarea>
                </td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center;">
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button>
                </td>
            `;
            tbody.appendChild(newRow);
            updateFoTareasListLabels();
        });
    }


    const addFoTareaBtn = document.getElementById('addFoTareaRow');
    if (addFoTareaBtn) {
        addFoTareaBtn.addEventListener('click', () => {
            const tbody = document.getElementById('foTareasBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-unidad" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><textarea class="row-tarea" style="width: 100%; background: transparent; border: none; color: white; padding: 8px; resize: vertical;"></textarea></td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center;"><button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button></td>
            `;
            tbody.appendChild(newRow);
        });
    }

    // Delegación para eliminar filas en formularios
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove-row')) {
            const row = e.target.closest('tr');
            const tbody = row ? row.parentElement : null;
            if (row) {
                row.remove();
                if (tbody && tbody.id === 'opRefsBody') {
                    updateOpRefLabels();
                }
                if (tbody && tbody.id === 'foRefsBody') {
                    updateFoRefLabels();
                }
                if (tbody && tbody.id === 'foTareasListBody') {
                    updateFoTareasListLabels();
                }
            }
        }
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-action');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        if (!id) return;

        if (btn.classList.contains('delete')) {
            if (btn.closest('#tableBodyORDPAT')) window.deleteORDPAT(id);
        } else if (btn.classList.contains('edit')) {
            if (btn.closest('#tableBodyORDPAT')) window.generateORDPATPDF(id);
        } else if (btn.classList.contains('load')) {
        }
    });



    const newORDPATBtn = document.getElementById('newORDPATBtn');
    if (newORDPATBtn) {
        newORDPATBtn.addEventListener('click', () => {
            const form = document.getElementById('patrolOrderForm');
            if (form) form.reset();
            // Clear dynamic tables if any
            const refs = document.getElementById('opRefsBody');
            if (refs) refs.innerHTML = '';
            const org = document.getElementById('opOrgBody');
            if (org) org.innerHTML = '';
            const tareas = document.getElementById('opTareasBody');
            if (tareas) tareas.innerHTML = '';
            
            showNotification('Formulario de Orden de Patrulla reiniciado');
        });
    }

    const clearORDPATBtn = document.getElementById('clearORDPATBtn');
    if (clearORDPATBtn) {
        clearORDPATBtn.addEventListener('click', () => {
            document.getElementById('opTareasBody').innerHTML = '';
            document.getElementById('opRefsBody').innerHTML = `
                <tr>
                    <td style="border: 1px solid var(--border); padding: 5px; width: 40px; text-align: center; color: var(--text-muted); font-family: monospace;">1)</td>
                    <td style="border: 1px solid var(--border); padding: 0;">
                        <input type="text" class="row-ref-text" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;">
                    </td>
                    <td style="border: 1px solid var(--border); padding: 5px; text-align: center; width: 50px;">
                        <button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button>
                    </td>
                </tr>
            `;
        });
    }

    // --- Eventos de Reportes Operacionales ---
    const btnGenReport = document.getElementById('generateReportBtn');
    if (btnGenReport) btnGenReport.addEventListener('click', generateOperationalReport);

    const btnExportReportExcel = document.getElementById('exportReportExcel');
    if (btnExportReportExcel) btnExportReportExcel.addEventListener('click', exportOperationalReportToExcel);

    const btnExportReportPDF = document.getElementById('exportReportPDF');
    if (btnExportReportPDF) btnExportReportPDF.addEventListener('click', exportOperationalReportToPDF);

    // --- Eventos de Visor de Órdenes ---
    const orderSearchInput = document.getElementById('orderSearchInput');
    if (orderSearchInput) {
        orderSearchInput.addEventListener('input', (e) => {
            renderLoadOrdersView(e.target.value);
        });
    }

    const btnDownloadCurrent = document.getElementById('downloadCurrentOrderBtn');
    if (btnDownloadCurrent) {
        btnDownloadCurrent.addEventListener('click', () => {
            const activeItem = document.querySelector('.order-list-item.active');
            if (activeItem) {
                const id = activeItem.dataset.id;
                const metadata = externalOrdersMetadata.find(m => m.id === id);
                if (metadata) {
                    getOrderFromDB(id).then(blob => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = metadata.name;
                        a.click();
                        URL.revokeObjectURL(url);
                    });
                }
            }
        });
    }

    const btnDeleteCurrent = document.getElementById('deleteCurrentOrderBtn');
    if (btnDeleteCurrent) {
        btnDeleteCurrent.addEventListener('click', () => {
            const activeItem = document.querySelector('.order-list-item.active');
            if (activeItem && confirm('¿Está seguro de eliminar esta orden del repositorio?')) {
                const id = activeItem.dataset.id;
                deleteExternalOrder(id);
            }
        });
    }

    const btnTriggerUpload = document.getElementById('triggerOrderUploadBtn');
    const fileInput = document.getElementById('externalOrderFile');
    if (btnTriggerUpload && fileInput) {
        btnTriggerUpload.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleExternalOrderUpload);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    if (!selectedLatLng && !editingId) {
        alert('Por favor, selecciona una ubicación exacta en el mapa.');
        return;
    }

    const type = document.getElementById('crimeType').value;
    const district = document.getElementById('district').value;
    const date = document.getElementById('date').value;
    const observation = document.getElementById('observation').value;

    if (editingId) {
        // Modo Edición
        const index = crimes.findIndex(c => c.id === editingId);
        if (index !== -1) {
            crimes[index].type = type;
            crimes[index].district = district;
            crimes[index].date = date;
            crimes[index].observation = observation;
            // Si el usuario hizo clic en el mapa, actualizamos lat/lng
            if (selectedLatLng) {
                crimes[index].lat = selectedLatLng.lat;
                crimes[index].lng = selectedLatLng.lng;
            }
            crimes[index].intensity = getIntensity(type);
            showNotification('Registro actualizado con éxito');
        }
    } else {
        // Modo Nuevo Registro
        const newCrime = {
            id: Date.now(),
            type,
            district,
            date,
            observation,
            lat: selectedLatLng.lat,
            lng: selectedLatLng.lng,
            intensity: getIntensity(type)
        };
        crimes.push(newCrime);
        showNotification(`Incidente de ${type} en ${district} registrado con éxito`);
    }

    saveData();
    refreshHeatLayer();
    refreshMarkers();
    updateUI();
    renderTable();
    updateDashboard();
    resetForm();
}

function resetForm() {
    const form = document.getElementById('crimeForm');
    form.reset();
    editingId = null;
    selectedLatLng = null;
    document.getElementById('observation').value = '';
    document.getElementById('lat').textContent = 'Lat: --';
    document.getElementById('lng').textContent = 'Lng: --';
    document.getElementById('submitBtn').textContent = 'Registrar Incidente';
    document.getElementById('submitBtn').classList.remove('editing');

    // Restaurar fecha actual
    const now = new Date();
    document.getElementById('date').value = now.toISOString().slice(0, 16);
}

function editCrime(id) {
    const crime = crimes.find(c => c.id === id);
    if (!crime) return;

    editingId = id;
    document.getElementById('crimeType').value = crime.type;
    document.getElementById('district').value = crime.district || "";
    document.getElementById('date').value = crime.date;
    document.getElementById('observation').value = crime.observation || "";
    document.getElementById('lat').textContent = `Lat: ${crime.lat.toFixed(5)}`;
    document.getElementById('lng').textContent = `Lng: ${crime.lng.toFixed(5)}`;

    // Cambiar apariencia del botón
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Actualizar Incidente';
    submitBtn.classList.add('editing');

    // Mover el mapa al punto y mostrar marcador
    map.setView([crime.lat, crime.lng], 15);
    L.circleMarker([crime.lat, crime.lng], {
        radius: 10,
        fillColor: "#ef4444",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map).fadeOut(3000);

    // Hacer scroll al formulario
    document.querySelector('.sidebar').scrollTop = 0;
    showNotification('Editando registro...');
}

// ----------------------------------------------------
// LÓGICA DE PERSONAL
// ----------------------------------------------------

function handlePersonnelSubmit(e) {
    e.preventDefault();

    const grade = document.getElementById('pGrade').value;
    const specialty = document.getElementById('pEspecialidad').value.trim();
    const name = document.getElementById('pName').value.trim();
    const idNum = document.getElementById('pId').value.trim();
    const condition = document.getElementById('pCondicion').value;
    const unit = document.getElementById('pUnit').value;
    const contact = document.getElementById('pContact').value.trim();

    if (editingPersonnelId) {
        const index = personnel.findIndex(p => p.id === editingPersonnelId);
        if (index !== -1) {
            personnel[index] = { ...personnel[index], grade, specialty, name, idNum, condition, unit, contact };
            showNotification('Registro de personal actualizado');
        }
    } else {
        const newPerson = {
            id: Date.now(),
            grade, specialty, name, idNum, condition, unit, contact
        };
        personnel.push(newPerson);
        showNotification(`${grade} ${name} registrado con éxito`);
    }

    saveData();
    updatePersonnelStats();

    renderPersonnelTable();
    resetPersonnelForm();
}

function resetPersonnelForm() {
    const form = document.getElementById('personnelForm');
    if (form) form.reset();
    editingPersonnelId = null;
    const btn = document.getElementById('submitPersonnelBtn');
    if (btn) {
        btn.textContent = 'Registrar Personal';
        btn.classList.remove('editing');
    }
}

function editPersonnel(id) {
    const person = personnel.find(p => p.id === id);
    if (!person) return;

    editingPersonnelId = id;
    document.getElementById('pGrade').value = person.grade;
    document.getElementById('pEspecialidad').value = person.specialty || '';
    document.getElementById('pName').value = person.name;
    document.getElementById('pId').value = person.idNum;
    if (document.getElementById('pCondicion')) document.getElementById('pCondicion').value = person.condition || 'OPERATIVO';
    document.getElementById('pUnit').value = person.unit;
    document.getElementById('pContact').value = person.contact;

    const btn = document.getElementById('submitPersonnelBtn');
    if (btn) {
        btn.textContent = 'Actualizar Personal';
        btn.classList.add('editing');
    }

    // Scroll al formulario y abrir sección si es necesario
    document.querySelector('.sidebar').scrollTop = 0;
    const personalBtn = document.querySelector('.menu-btn[data-target="personal"]');
    if (personalBtn && !personalBtn.classList.contains('active')) {
        personalBtn.click();
    }
    showNotification('Editando ficha de personal...');
}

function deletePersonnel(id) {
    if (confirm('¿Eliminar de forma permanente este miembro del personal?')) {
        const targetId = String(id);

        // Remover del control principal
        personnel = personnel.filter(p => String(p.id) !== targetId);

        // Cascading delete de los demás apartados
        baborPersonnel = baborPersonnel.filter(p => String(p.id) !== targetId);
        estriborPersonnel = estriborPersonnel.filter(p => String(p.id) !== targetId);
        guardAssignments = guardAssignments.filter(a => String(a.id) !== targetId);
        specialAssignments = specialAssignments.filter(a => String(a.id) !== targetId);

        // Guardar cambios en las divisiones que no están en saveData()
        localStorage.setItem('baborPersonnel', JSON.stringify(baborPersonnel));
        localStorage.setItem('estriborPersonnel', JSON.stringify(estriborPersonnel));

        if (String(editingPersonnelId) === targetId) resetPersonnelForm();

        saveData(); // Guarda personnel, guardAssignments, specialAssignments, opsEvents
        updatePersonnelStats();
        renderPersonnelTable();

        // Refrescar vistas si las funciones existen
        if (typeof renderWatchDivision === 'function') renderWatchDivision();
        if (typeof renderDistribution === 'function') renderDistribution();
        if (typeof renderDistributionTable === 'function') renderDistributionTable();

        showNotification('Registro de personal eliminado de todos los apartados');
    }
}

let personnelPostChart = null;
let personnelUnitChart = null;

function updatePersonnelStats() {
    const statTotal = document.getElementById('statTotalPersonal');
    const statGridTotal = document.getElementById('statTotalPersonnelGrid');
    const statBabor = document.getElementById('statTotalBabor');
    const statEstribor = document.getElementById('statTotalEstribor');
    const statOperativos = document.getElementById('statTotalOperativos');
    const statOtros = document.getElementById('statTotalOtros');

    if (!statTotal) return;

    // A. CARGAR DATOS SI ESTÁN VACÍOS (Persistencia tras refrescar)
    if (personnel.length === 0) {
        // Garantizar que si no hay personal, nada aparezca en las divisiones
        baborPersonnel = [];
        estriborPersonnel = [];
        guardAssignments = [];
        specialAssignments = [];
        localStorage.removeItem('baborPersonnel');
        localStorage.removeItem('estriborPersonnel');
    } else {
        if (baborPersonnel.length === 0 && localStorage.getItem('baborPersonnel')) {
            baborPersonnel = JSON.parse(localStorage.getItem('baborPersonnel'));
        }
        if (estriborPersonnel.length === 0 && localStorage.getItem('estriborPersonnel')) {
            estriborPersonnel = JSON.parse(localStorage.getItem('estriborPersonnel'));
        }
        if (guardAssignments.length === 0 && localStorage.getItem('guardAssignments')) {
            guardAssignments = JSON.parse(localStorage.getItem('guardAssignments'));
        }
        if (specialAssignments.length === 0 && localStorage.getItem('specialAssignments')) {
            specialAssignments = JSON.parse(localStorage.getItem('specialAssignments'));
        }
    }

    // 1. Total Personal Registrado (Siempre el total en la base de datos)
    statTotal.textContent = personnel.length;

    // Estadísticas de condición
    const countOperativos = personnel.filter(p => !p.condition || p.condition === 'OPERATIVO').length;
    const countOtros = personnel.length - countOperativos;
    if (statOperativos) statOperativos.textContent = countOperativos;
    if (statOtros) statOtros.textContent = countOtros;

    // 2. Cálculo del Personal Seleccionado (Babor, Estribor o Ambos)
    const getSelectedCount = () => {
        if (selectedWatchGroup === 'both') return baborPersonnel.length + estriborPersonnel.length;
        if (selectedWatchGroup === 'babor') return baborPersonnel.length;
        if (selectedWatchGroup === 'estribor') return estriborPersonnel.length;
        return 0;
    };

    const currentSelectedTotal = getSelectedCount();

    // 3. Poblar los recuadros de la cuadrícula (Sólo mostrar count si el grupo está entre los elegidos)
    if (statGridTotal) statGridTotal.textContent = currentSelectedTotal;

    if (statBabor) {
        const isBaborVisible = (selectedWatchGroup === 'babor' || selectedWatchGroup === 'both');
        statBabor.textContent = isBaborVisible ? baborPersonnel.length : 0;
    }

    if (statEstribor) {
        const isEstriborVisible = (selectedWatchGroup === 'estribor' || selectedWatchGroup === 'both');
        statEstribor.textContent = isEstriborVisible ? estriborPersonnel.length : 0;
    }

    // --- LÓGICA DE GRÁFICOS CON DESGLOSE POR GRUPO ---

    // 1. Estadísticas por Puesto (Basado en la distribución de guardia actual)
    const allAssignments = [...specialAssignments, ...guardAssignments];

    // Sets de IDs para clasificación rápida
    const baborIds = new Set(baborPersonnel.map(p => String(p.id)));
    const estriborIds = new Set(estriborPersonnel.map(p => String(p.id)));

    const postCountsBabor = {};
    const postCountsEstribor = {};
    const postCountsUndivided = {}; // Para casos donde no hay división previa

    allAssignments.forEach(a => {
        const loc = a.assignedLocation || "Otro";
        const personId = String(a.id);

        if (baborIds.has(personId)) {
            postCountsBabor[loc] = (postCountsBabor[loc] || 0) + 1;
        } else if (estriborIds.has(personId)) {
            postCountsEstribor[loc] = (postCountsEstribor[loc] || 0) + 1;
        } else {
            // Si no está en ninguno de los dos (ej: personal nuevo o no dividido)
            postCountsUndivided[loc] = (postCountsUndivided[loc] || 0) + 1;
        }
    });

    // Unir todas las localizaciones únicas para el eje X
    const allPosts = [...new Set([
        ...Object.keys(postCountsBabor),
        ...Object.keys(postCountsEstribor),
        ...Object.keys(postCountsUndivided)
    ])].filter(p => p !== "Otro"); // Limpiar un poco
    // Renderizar Gráfico de Puestos
    const ctxPost = document.getElementById('personnelPostChart');
    if (ctxPost) {
        if (personnelPostChart) personnelPostChart.destroy();
        personnelPostChart = new Chart(ctxPost.getContext('2d'), {
            type: 'bar',
            data: {
                labels: allPosts,
                datasets: [
                    {
                        label: 'Babor',
                        data: allPosts.map(p => postCountsBabor[p] || 0),
                        backgroundColor: 'rgba(14, 165, 233, 0.6)',
                        borderColor: '#0ea5e9',
                        borderWidth: 1
                    },
                    {
                        label: 'Estribor',
                        data: allPosts.map(p => postCountsEstribor[p] || 0),
                        backgroundColor: 'rgba(239, 68, 68, 0.6)',
                        borderColor: '#ef4444',
                        borderWidth: 1
                    },
                    {
                        label: 'Sin Grupo',
                        data: allPosts.map(p => postCountsUndivided[p] || 0),
                        backgroundColor: 'rgba(148, 163, 184, 0.4)',
                        borderColor: '#94a3b8',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#94a3b8', stepSize: 1 }
                    },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#94a3b8', font: { size: 10 } }
                    },
                    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleColor: '#38bdf8', bodyColor: '#fff' }
                }
            }
        });
    }

    // 3. Estadísticas por Reparto (Desglose por Grados)
    const unitGradeCounts = {}; // { Unit: { Grade: Count } }
    const gradesSet = new Set();
    const unitsSet = new Set();

    personnel.forEach(p => {
        const u = p.unit || "S/N";
        const g = p.grade || "S/N";
        if (!unitGradeCounts[u]) unitGradeCounts[u] = {};
        unitGradeCounts[u][g] = (unitGradeCounts[u][g] || 0) + 1;
        gradesSet.add(g);
        unitsSet.add(u);
    });

    const allUnitsSorted = [...unitsSet].sort();
    const allGradesSorted = [...gradesSet].sort((a, b) => {
        const hierarchy = ["CPNV", "CPFG", "CPCB", "TNNV", "TNFG", "ALFG", "SUBM", "SUBP", "SUBS", "SGOP", "SGOS", "CBOP", "CBOS", "MARO"];
        return hierarchy.indexOf(a) - hierarchy.indexOf(b);
    });

    // Paleta de colores para grados (Premium)
    const gradeColors = [
        '#0ea5e9', '#38bdf8', '#7dd3fc', // Blues
        '#ef4444', '#f87171', '#fca5a5', // Reds
        '#22c55e', '#4ade80', '#86efac', // Greens
        '#f59e0b', '#fbbf24', '#fcd34d', // Oranges
        '#8b5cf6', '#a78bfa', '#c4b5fd'  // Purples
    ];

    const unitDatasets = allGradesSorted.map((grade, index) => {
        return {
            label: grade,
            data: allUnitsSorted.map(unit => unitGradeCounts[unit][grade] || 0),
            backgroundColor: gradeColors[index % gradeColors.length] + '99', // adding transparency
            borderColor: gradeColors[index % gradeColors.length],
            borderWidth: 1
        };
    });

    // Renderizar Gráfico de Repartos
    const ctxUnit = document.getElementById('personnelUnitChart');
    if (ctxUnit) {
        if (personnelUnitChart) personnelUnitChart.destroy();
        personnelUnitChart = new Chart(ctxUnit.getContext('2d'), {
            type: 'bar',
            data: {
                labels: allUnitsSorted,
                datasets: unitDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#94a3b8', stepSize: 1 }
                    },
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { size: 10 } }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: { color: '#94a3b8', font: { size: 10 }, boxWidth: 10 }
                    },
                    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleColor: '#38bdf8', bodyColor: '#fff' }
                }
            }
        });
    }
}

function renderPersonnelTable(searchTerm = '') {
    const tableBody = document.getElementById('tableBodyPersonnel');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const filtered = personnel.filter(p => {
        const name = (p.name || '').toLowerCase();
        const unit = (p.unit || '').toLowerCase();
        return name.includes(searchTerm) || unit.includes(searchTerm);
    });

    filtered.forEach(p => {
        const row = document.createElement('tr');
        if (editingPersonnelId === p.id) row.style.background = 'rgba(56, 189, 248, 0.1)';

        const condicion = p.condition || 'OPERATIVO';
        const isOperativo = condicion === 'OPERATIVO';
        const rowColorStyle = !isOperativo ? 'color: #ef4444; font-weight: bold;' : '';

        if (!isOperativo) {
            row.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
        }

        row.innerHTML = `
            <td style="${rowColorStyle}">${p.grade}</td>
            <td style="${rowColorStyle}">${p.specialty || 'N/A'}</td>
            <td style="${rowColorStyle}">${p.name}</td>
            <td style="${rowColorStyle}">${p.idNum}</td>
            <td style="${rowColorStyle}">${condicion}</td>
            <td style="${rowColorStyle}">${p.unit}</td>
            <td style="${rowColorStyle}">${p.contact}</td>
            <td class="table-actions">
                <button class="btn-action edit" onclick="editPersonnel(${p.id})" title="Editar">✏️</button>
                <button class="btn-action delete" onclick="deletePersonnel(${p.id})" title="Eliminar">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function downloadPersonnelTemplate() {
    const ws_data = [
        ['Grado', 'Especialidad', 'Apellidos y Nombres', 'Cédula', 'Condición', 'Reparto', 'Nro Telefónico'],
        ['Marinero', 'Infante de Marina', 'Pérez Juan', '0999999999', 'OPERATIVO', 'SUR', '0988888888']
    ];

    // Set column widths
    const wscols = [
        { wch: 15 }, { wch: 25 }, { wch: 35 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    ws['!cols'] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla_Personal");

    XLSX.writeFile(wb, "Plantilla_Importar_Personal_GT100.xlsx");
}

function handlePersonnelExcelImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert to 2D array to avoid header key dependency
            const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

            if (dataArray.length === 0) {
                showNotification("El archivo Excel está vacío.");
                return;
            }

            // Attempt to find the header row dynamically
            let headerRowIndex = -1;
            let colMap = { grade: -1, spec: -1, name: -1, id: -1, cond: -1, unit: -1, role: -1, status: -1, contact: -1 };

            for (let i = 0; i < Math.min(10, dataArray.length); i++) {
                const row = dataArray[i];
                if (!Array.isArray(row)) continue;

                let foundHeaders = 0;
                for (let j = 0; j < row.length; j++) {
                    const cellVal = String(row[j] || '').toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    if (!cellVal) continue;

                    if (cellVal.includes('grado') || cellVal.includes('rango')) { colMap.grade = j; foundHeaders++; }
                    else if (cellVal.includes('especialidad') || cellVal === 'esp') { colMap.spec = j; foundHeaders++; }
                    else if (cellVal.includes('nombres') || cellVal.includes('nombre')) { colMap.name = j; foundHeaders++; }
                    else if (cellVal.includes('cedula') || cellVal.includes('identificacion') || cellVal.includes('dni')) { colMap.id = j; foundHeaders++; }
                    else if (cellVal.includes('condicion')) { colMap.cond = j; foundHeaders++; }
                    else if (cellVal.includes('reparto') || cellVal.includes('unidad')) { colMap.unit = j; foundHeaders++; }
                    else if (cellVal.includes('telefon') || cellVal.includes('contacto') || cellVal.includes('celular')) { colMap.contact = j; foundHeaders++; }
                }

                if (foundHeaders >= 2) {
                    headerRowIndex = i;
                    break;
                }
            }

            // Si no encontró cabeceras claras, asume el orden por defecto y empieza en la fila 0 (si no hay headers)
            if (headerRowIndex === -1) {
                colMap = { grade: 0, spec: 1, name: 2, id: 3, cond: 4, unit: 5, contact: 6 };
                headerRowIndex = -1; // Comienza a leer desde el inicio
            }

            let importedCount = 0;
            let currentDetectedGuard = null; // Variable para rastrear la guardia actual según la jerarquía

            for (let i = headerRowIndex + 1; i < dataArray.length; i++) {
                const row = dataArray[i];
                if (!Array.isArray(row)) continue;

                // Evitar filas completamente vacías
                const hasData = row.some(v => v !== undefined && v !== null && String(v).trim() !== '');
                if (!hasData) continue;

                // Detectar si la fila es un encabezado de grupo (ej: "GUARDIA DE BABOR")
                const rowTextStr = row.join(' ').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (rowTextStr.includes("guardia de babor") || rowTextStr.includes("grupo babor") || rowTextStr.trim() === "babor") {
                    currentDetectedGuard = 'babor';
                    continue; // Skip processing this header row as a person
                } else if (rowTextStr.includes("guardia de estribor") || rowTextStr.includes("grupo estribor") || rowTextStr.trim() === "estribor") {
                    currentDetectedGuard = 'estribor';
                    continue;
                }

                // Extraer valores o usar defaults
                const gradeVal = colMap.grade !== -1 ? row[colMap.grade] : '';
                const specVal = colMap.spec !== -1 ? row[colMap.spec] : '';
                const nameVal = colMap.name !== -1 ? row[colMap.name] : '';
                const idVal = colMap.id !== -1 ? row[colMap.id] : '';
                const condVal = colMap.cond !== -1 ? row[colMap.cond] : '';
                const unitVal = colMap.unit !== -1 ? row[colMap.unit] : '';
                const contactVal = colMap.contact !== -1 ? row[colMap.contact] : '';

                let grade = String(gradeVal || 'S/N Grado');
                let specialty = String(specVal || '');
                const name = String(nameVal || 'S/N Nombre');
                const idNum = String(idVal || 'S/N Cédula');

                // Si Especialidad está vacía, intentar extraerla del Grado (ej: "Marinero - Infante de Marina" o "Marinero Infante")
                if (!specialty && grade !== 'S/N Grado') {
                    if (grade.includes('-')) {
                        const parts = grade.split('-');
                        grade = parts[0].trim();
                        specialty = parts.slice(1).join('-').trim();
                    } else {
                        // Si no hay guion, la especialidad estándar suele estar al final, intentamos extraer asumiendo un formato de dos partes
                        const parts = grade.split(' ');
                        if (parts.length > 1 && !grade.toLowerCase().includes('cabo') && !grade.toLowerCase().includes('sargento')) {
                            // Este es un separador simple por espacio (Marinero Infante)
                            grade = parts[0].trim();
                            specialty = parts.slice(1).join(' ').trim();
                        } else if (parts.length > 2) {
                            // Considerar grados compuestos como Cabo Primero, Sargento Segundo
                            grade = parts.slice(0, 2).join(' ').trim();
                            specialty = parts.slice(2).join(' ').trim();
                        }
                    }
                }

                if (!specialty || specialty.trim() === '') {
                    specialty = 'S/N Especialidad';
                }

                // Si la fila "parece" un título o cabecera ignorado, y contiene "S/N Nombre", mejor la omitimos
                // Especialmente importante si falló la detección de cabeceras
                if (grade === 'S/N Grado' && name === 'S/N Nombre' && idNum === 'S/N Cédula') continue;

                const newPerson = {
                    id: Date.now() + importedCount,
                    grade: grade,
                    specialty: specialty,
                    name: name,
                    idNum: idNum,
                    condition: String(condVal || 'OPERATIVO').toUpperCase().trim(),
                    unit: String(unitVal || 'N/A'),
                    contact: String(contactVal || '')
                };

                personnel.push(newPerson);

                // Auto-asignación a guardia si existe el encabezado
                if (currentDetectedGuard === 'babor') {
                    baborPersonnel.push(newPerson);
                } else if (currentDetectedGuard === 'estribor') {
                    estriborPersonnel.push(newPerson);
                }

                importedCount++;
            }

            if (importedCount > 0) {
                if (baborPersonnel.length > 0) localStorage.setItem('baborPersonnel', JSON.stringify(baborPersonnel));
                if (estriborPersonnel.length > 0) localStorage.setItem('estriborPersonnel', JSON.stringify(estriborPersonnel));

                saveData();
                updatePersonnelStats();
                renderPersonnelTable();

                if (typeof renderWatchDivision === 'function') renderWatchDivision();

                showNotification(`Se importaron ${importedCount} registros exitosamente.`);
            } else {
                showNotification("No se encontraron registros válidos en el archivo.");
            }

        } catch (error) {
            console.error("Error al importar Excel:", error);
            showNotification("Error al leer el archivo Excel. Verifica el formato.");
        }

        // Reset input so the same file can be uploaded again if needed
        document.getElementById('personnelExcelFile').value = '';
    };

    reader.readAsArrayBuffer(file);
}
// ----------------------------------------------------

function getIntensity(type) {
    // Definir importancia del delito para el mapa de calor
    switch (type) {
        case 'sicariato': return 0.9;
        case 'extorsion': return 0.8;
        case 'droga': return 0.7;
        case 'robo': return 0.6;
        default: return 0.5;
    }
}

function refreshHeatLayer() {
    // Remover todas las capas de calor existentes
    Object.values(heatLayers).forEach(layer => {
        if (layer) map.removeLayer(layer);
    });

    // Tipos de delitos + Operaciones
    const types = ['robo', 'sicariato', 'extorsion', 'droga', 'operacion'];

    types.forEach(type => {
        // Combinar crímenes y operaciones para el calor si es tipo operacion
        let dataToHeat = [];
        if (type === 'operacion') {
            dataToHeat = instantOps
                .filter(op => op.lat != null && op.lng != null && !isNaN(op.lat) && !isNaN(op.lng))
                .map(op => [op.lat, op.lng, 0.8]);
        } else {
            dataToHeat = crimes.filter(c => c.type === type).map(c => [c.lat, c.lng, c.intensity]);
        }

        if (dataToHeat.length > 0) {
            // Crear una capa de calor individual para este tipo
            heatLayers[type] = L.heatLayer(dataToHeat, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
                gradient: CATEGORY_GRADIENTS[type]
            }).addTo(map);
        } else {
            heatLayers[type] = null;
        }
    });
}

function refreshMarkers() {
    if (!markerLayer) return;
    markerLayer.clearLayers();

    // Limpiar objeto de referencias
    for (let id in incidentMarkers) delete incidentMarkers[id];

    crimes.forEach(crime => {
        const marker = L.circleMarker([crime.lat, crime.lng], {
            radius: 6,
            fillColor: CRIME_COLORS[crime.type] || '#fff',
            color: '#fff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });

        const popupContent = `
            <div class="custom-popup">
                <h4 style="margin: 0 0 5px 0; color: #38bdf8; text-transform: capitalize;">${crime.type}</h4>
                <p style="margin: 0; font-size: 0.9em;"><b>Distrito:</b> ${crime.district || 'S/N'}</p>
                <p style="margin: 0; font-size: 0.9em;"><b>Fecha:</b> ${new Date(crime.date).toLocaleString()}</p>
                <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="margin: 0; font-size: 0.9em;"><b>Observación:</b><br>${crime.observation || 'Sin observaciones'}</p>
            </div>
        `;

        marker.bindPopup(popupContent);
        markerLayer.addLayer(marker);

        // Guardar referencia al marcador
        incidentMarkers[crime.id] = marker;
    });

    // Añadir marcadores de operaciones
    instantOps.forEach(op => {
        if (op.lat == null || op.lng == null || isNaN(op.lat) || isNaN(op.lng)) return;
        const marker = L.circleMarker([op.lat, op.lng], {
            radius: 8,
            fillColor: CRIME_COLORS.operacion,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        });

        const popupContent = `
            <div class="custom-popup" style="min-width: 250px;">
                <div style="background: #8b5cf6; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; margin-bottom: 8px; font-size: 0.75rem;">
                    OFICIAL: ${op.reportNum || 'S/N'}
                </div>
                <p style="margin: 0 0 4px 0; font-size: 0.85rem;"><b>REF:</b> ${op.ref || '---'}</p>
                <p style="margin: 0 0 4px 0; font-size: 0.85rem;"><b>Ubicación:</b> ${op.donde || '---'}</p>
                <p style="margin: 0 0 8px 0; font-size: 0.85rem;"><b>Fecha:</b> ${op.date || '---'}</p>
                
                <div style="margin: 8px 0 0 0; font-size: 0.8rem; color: #555; max-height: 100px; overflow-y: auto; border-top: 1px solid #eee; padding-top: 8px;">
                    ${op.resultadosRich ? stripHtmlForPDF(op.resultadosRich).substring(0, 150) + '...' : 'Sin detalles registrados'}
                </div>
                
                <button onclick="generateOfficialDetailedPDF('${op.id}')" style="width: 100%; margin-top: 10px; padding: 6px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">
                    Descargar PDF Oficial
                </button>
            </div>
        `;

        marker.bindPopup(popupContent);
        markerLayer.addLayer(marker);
        incidentMarkers[op.id] = marker; // Reutilizamos el mismo sistema de focus
    });
}

function focusOnIncident(id) {
    const marker = incidentMarkers[id];
    if (marker) {
        const latLng = marker.getLatLng();
        map.setView(latLng, 16);
        marker.openPopup();

        // Feedback visual temporal
        const circle = L.circle(latLng, {
            radius: 50,
            color: '#38bdf8',
            fillColor: '#38bdf8',
            fillOpacity: 0.3,
            weight: 2
        }).addTo(map);

        setTimeout(() => map.removeLayer(circle), 2000);
    }
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    crimes.forEach(crime => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        if (editingId === crime.id) row.style.background = 'rgba(56, 189, 248, 0.1)';

        row.onclick = (e) => {
            // No hacer nada si se hace clic en los botones de acción
            if (e.target.closest('.table-actions')) return;
            focusOnIncident(crime.id);
        };

        row.innerHTML = `
            <td style="text-transform: capitalize;">${crime.type}</td>
            <td>${crime.district || 'S/N'}</td>
            <td>${new Date(crime.date).toLocaleString()}</td>
            <td>${crime.lat.toFixed(4)}, ${crime.lng.toFixed(4)}</td>
            <td>${crime.observation || '---'}</td>
            <td class="table-actions">
                <button class="btn-action report" onclick="generateInstantReportFromCrime(${crime.id})" title="Generar Parte">📄</button>
                <button class="btn-action edit" onclick="editCrime(${crime.id})" title="Editar">✏️</button>
                <button class="btn-action delete" onclick="deleteCrime(${crime.id})" title="Eliminar">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteCrime(id) {
    if (confirm('¿Eliminar este registro?')) {
        crimes = crimes.filter(c => c.id !== id);
        if (editingId === id) resetForm();
        saveData();
        refreshHeatLayer();
        refreshMarkers();
        updateUI();
        renderTable();
        updateDashboard();
        showNotification('Registro eliminado');
    }
}

function exportToExcel() {
    if (crimes.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    const data = crimes.map(c => ({
        Delito: c.type.toUpperCase(),
        Distrito: c.district || 'N/A',
        Fecha: new Date(c.date).toLocaleString(),
        Latitud: c.lat,
        Longitud: c.lng
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Delitos");
    XLSX.writeFile(workbook, "Reporte_Delitos_GT100.51.xlsx");
}

function exportToPDF() {
    if (crimes.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text('GT 100.51 - SEGURIDAD MARÍTIMA', 14, 20);
    doc.setFontSize(12);
    doc.text('REPORTE DE INCIDENTES DELICTIVOS', 14, 30);
    doc.text(`Fecha de reporte: ${new Date().toLocaleString()}`, 14, 38);

    // Generar cuerpo de la tabla
    const tableData = crimes.map(c => [
        c.type.toUpperCase(),
        c.district || 'N/A',
        new Date(c.date).toLocaleString(),
        c.lat,
        c.lng
    ]);

    doc.autoTable({
        head: [['Delito', 'Distrito', 'Fecha', 'Latitud', 'Longitud']],
        body: tableData,
        startY: 40,
        theme: 'striped',
        headStyles: { fillColor: [14, 165, 233] }
    });

    doc.save('Reporte_Incidentes_GT100.51.pdf');
}

function exportDistributionToExcel() {
    const allAssignments = [...specialAssignments, ...guardAssignments];
    if (allAssignments.length === 0) {
        showNotification('No hay una distribución generada para exportar.');
        return;
    }

    const shiftsResources = [
        { name: "TURNO 1", time: "0800-1200 / 2000-0000" },
        { name: "TURNO 2", time: "1200-1600 / 0000-0400" },
        { name: "TURNO 3", time: "1600-2000 / 0400-0800" }
    ];

    // Datos finales para la hoja (Array of Arrays)
    const aoa_data = [
        ["GT 100.51 - CUADRO DE DISTRIBUCIÓN DE PERSONAL"],
        [`Fecha de Generación: ${new Date().toLocaleString()}`],
        [], // Espacio
        ["GRADO", "ESPECIALIDAD", "NOMBRES Y APELLIDOS", "CÉDULA", "REPARTO", "CONTACTO"] // Encabezado de tabla
    ];

    // Helper para agregar bloques de datos
    const appendExcelBlock = (title, items) => {
        if (items.length === 0) return;

        // Fila de Encabezado de Sección
        aoa_data.push([title.toUpperCase()]);

        const uniqueLocs = [...new Set(items.map(m => m.assignedLocation))];
        uniqueLocs.forEach(locName => {
            const locMembers = items.filter(m => m.assignedLocation === locName);
            const time = locMembers[0].assignedTime || "";

            // Fila de Encabezado de Puesto
            aoa_data.push([`   ${locName}${time ? ' (' + time + ')' : ''}`]);

            // Filas de Personal
            locMembers.forEach(p => {
                aoa_data.push([
                    p.grade,
                    p.specialty || "N/A",
                    p.name,
                    p.idNum || "S/N",
                    p.unit || "N/A",
                    p.contact || "S/N"
                ]);
            });
        });
        aoa_data.push([]); // Espacio entre bloques
    };

    // Construir estructura
    appendExcelBlock("TAREAS DE APOYO (CUOTAS FIJAS)", specialAssignments);

    const tqMembers = guardAssignments.filter(d => d.assignedShift === "CONTROL TOQUE DE QUEDA");
    appendExcelBlock("CONTROL TOQUE DE QUEDA (REPARTO AUTOMÁTICO)", tqMembers);

    shiftsResources.forEach(shift => {
        const shiftMembers = guardAssignments.filter(d => d.assignedShift === shift.name);
        appendExcelBlock(`${shift.name} (${shift.time})`, shiftMembers);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(aoa_data);

    // Ajustes de ancho de columna
    const wscols = [
        { wch: 15 }, // Grado
        { wch: 25 }, // Especialidad
        { wch: 40 }, // Nombres
        { wch: 15 }, // Cédula
        { wch: 20 }  // Contacto
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Distribucion_GT100.51");
    XLSX.writeFile(workbook, "Distribucion_Personal_GT100.51.xlsx");
}

function exportOpsToExcel() {
    if (opsEvents.length === 0) {
        showNotification('No hay eventos planificados para exportar.');
        return;
    }

    const aoa_data = [
        ["PLANIFICACIÓN DE OPERACIONES G.T. 100-51 \"CODESC\""],
        [],
        ["FECHA:", new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(), "", "", "", "", "", ""]
    ];

    // Grupar eventos por distrito
    const groups = {};
    opsEvents.forEach(event => {
        const dist = event.distrito || 'SIN DISTRITO';
        if (!groups[dist]) groups[dist] = [];
        groups[dist].push(event);
    });

    Object.keys(groups).sort().forEach(distName => {
        const events = groups[distName];

        // Fila de encabezado de distrito
        aoa_data.push([distName, "", "", "", "", "", "", ""]);
        aoa_data.push(["N°", "EVENTO / FECHA-HORA", "SECTOR", "PERSONAL EMPLEADO", "VEHÍCULOS", "NOVEDAD", "", ""]);

        events.forEach((item, index) => {
            aoa_data.push([
                index + 1,
                `${item.evento} ${item.fechaHora}`,
                item.sector,
                item.personal,
                item.vehiculos,
                item.novedad || '-',
                "",
                ""
            ]);
        });

        // Fila vacía entre distritos
        aoa_data.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(aoa_data);

    // Formato específico basado en el modelo
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, // Título unificado
        { s: { r: 2, c: 0 }, e: { r: 2, c: 0 } }, // FECHA label
        { s: { r: 2, c: 1 }, e: { r: 2, c: 5 } }  // FECHA value
    ];

    const wscols = [
        { wch: 8 },  // N°
        { wch: 25 }, // Evento
        { wch: 20 }, // Fecha/Hora
        { wch: 15 }, // Distrito
        { wch: 40 }, // Sector
        { wch: 30 }, // Personal
        { wch: 20 }, // Vehículos
        { wch: 40 }  // Novedad
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GT. 100-51");
    XLSX.writeFile(workbook, `PLANIFICACION_GT100.51_${new Date().toISOString().split('T')[0]}.xlsx`);
}

function exportOpsToPDF() {
    if (opsEvents.length === 0) {
        showNotification("No hay eventos registrados para exportar.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    // Agrupar eventos por distrito
    const groups = {};
    opsEvents.forEach(event => {
        const dist = event.distrito || 'SIN DISTRITO';
        if (!groups[dist]) groups[dist] = [];
        groups[dist].push(event);
    });

    let currentY = 15;

    // Título Principal Global
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('PLANIFICACIÓN DE OPERACIONES', 148.5, currentY, { align: 'center' });

    currentY += 8;
    // Fecha Global
    doc.setFontSize(10);
    doc.text(`FECHA: ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}`, 148.5, currentY, { align: 'center' });

    currentY += 15;

    Object.keys(groups).sort().forEach((distName, groupIndex) => {
        const events = groups[distName];

        if (groupIndex > 0) {
            // Añadir espacio entre distritos o nueva página si es necesario
            currentY += 15;
            if (currentY > 180) {
                doc.addPage();
                currentY = 15;
            }
        }

        // Subtítulo del Distrito
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(distName, 14, currentY);

        const rows = events.map((item, index) => [
            index + 1,
            `${item.evento} ${item.fechaHora}`,
            item.sector,
            item.personal,
            item.vehiculos,
            item.novedad || '-'
        ]);

        doc.autoTable({
            startY: currentY + 5,
            head: [['N°', 'EVENTO / FECHA-HORA', 'SECTOR', 'PERSONAL EMPLEADO', 'VEHÍCULOS', 'NOVEDAD / CAMBIOS']],
            body: rows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
            headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' },
            columnStyles: {
                0: { halign: 'center', cellWidth: 10 },
                1: { cellWidth: 60 },
                2: { cellWidth: 50 },
                3: { cellWidth: 40 },
                4: { cellWidth: 40 },
                5: { cellWidth: 70 }
            },
            margin: { left: 10, right: 10 },
            didDrawPage: (data) => {
                currentY = data.cursor.y;
            }
        });

        currentY = doc.lastAutoTable.finalY;
    });

    // Pie de firma del Oficial de OMAI
    let finalY = currentY + 25;

    if (finalY > 180) {
        doc.addPage();
        finalY = 30;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('__________________________', 148.5, finalY, { align: 'center' });
    doc.text('OFICIAL OMAI', 148.5, finalY + 7, { align: 'center' });

    doc.save(`PLANIFICACION_OPERACIONES_${new Date().toISOString().split('T')[0]}.pdf`);
}

// --- Funciones de Planificación de Operaciones ---

function updateOpsPersonnelAutoFill() {
    const district = document.getElementById('opsDistrito').value;
    const shiftVal = document.getElementById('opsFechaHora').value;
    const personalInput = document.getElementById('opsPersonal');

    if (!district || !shiftVal || !personalInput) return;

    // Asegurar que los datos estén cargados si se refrescó la página
    if (guardAssignments.length === 0 && localStorage.getItem('guardAssignments')) {
        guardAssignments = JSON.parse(localStorage.getItem('guardAssignments'));
    }
    if (specialAssignments.length === 0 && localStorage.getItem('specialAssignments')) {
        specialAssignments = JSON.parse(localStorage.getItem('specialAssignments'));
    }

    // Mapear el valor del select al nombre de turno usado en las asignaciones
    const reverseShiftMap = {
        "08H00 A 12H00 / 20H00 A 00H00": "TURNO 1",
        "12H00 A 16H00 / 00H00 A 04H00": "TURNO 2",
        "16H00 A 20H00 / 04H00 A 08H00": "TURNO 3",
        "CONTROL TOQUE DE QUEDA": "CONTROL TOQUE DE QUEDA"
    };

    const targetShiftName = reverseShiftMap[shiftVal];
    if (!targetShiftName) return;

    // Clasificación de Grados (Oficiales vs Tripulantes)
    const officerGrades = ['CPNV', 'CPFG', 'CPCB', 'TNNV', 'TNFG', 'ALFG', 'MAESTRO'];

    // Combinar todas las asignaciones para la búsqueda
    const allAssignments = [...guardAssignments, ...specialAssignments];

    // Filtrar asignaciones que coincidan con el turno Y el puesto (distrito) seleccionado
    const matchingAssignments = allAssignments.filter(a => {
        // El puesto DEBE coincidir con el seleccionado
        if (a.assignedLocation !== district) return false;

        // El turno debe coincidir (o ser TAREA DE APOYO si el puesto es especial)
        return a.assignedShift === targetShiftName || a.assignedShift === "TAREA DE APOYO";
    });

    let ofCount = 0;
    let triCount = 0;

    matchingAssignments.forEach(p => {
        const grade = (p.grade || '').toUpperCase();
        const isOfficer = officerGrades.some(og => grade.includes(og));
        if (isOfficer) ofCount++;
        else triCount++;
    });

    // Formatear el resultado (Ej: 01 OF + 08 TRI)
    const ofStr = ofCount.toString().padStart(2, '0');
    const triStr = triCount.toString().padStart(2, '0');

    personalInput.value = `${ofStr} OF + ${triStr} TRI`;
}

function renderOpsPlanningTable() {
    const container = document.getElementById('opsPlanningContainer');
    if (!container) return;

    container.innerHTML = '';

    if (opsEvents.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay eventos planificados. Haz clic en "Nuevo Evento".</p>';
        return;
    }

    // Agrupar eventos por distrito
    const groups = {};
    opsEvents.forEach(event => {
        const dist = event.distrito || 'SIN DISTRITO';
        if (!groups[dist]) groups[dist] = [];
        groups[dist].push(event);
    });

    // Para cada distrito, crear una tabla
    Object.keys(groups).sort().forEach(distName => {
        const events = groups[distName];

        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'district-table-wrapper';
        tableWrapper.style.marginBottom = '2rem';
        tableWrapper.style.overflowX = 'auto';
        tableWrapper.style.background = 'var(--bg-card)';
        tableWrapper.style.borderRadius = '8px';
        tableWrapper.style.border = '1px solid var(--border)';

        const table = document.createElement('table');
        table.className = 'distribution-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = new Date().toLocaleDateString('es-ES', options).toUpperCase();

        table.innerHTML = `
            <thead>
                <tr style="background: #1e293b; color: white;">
                    <th colspan="8" style="padding: 12px; font-size: 1.1rem; text-align: center; border-bottom: 2px solid var(--accent-primary);">
                        DISTRITO: ${distName} - PLANIFICACIÓN GT 100.51
                    </th>
                </tr>
                <tr style="background: rgba(255,255,255,0.02);">
                    <th colspan="2" style="text-align: left; padding: 10px; border-bottom: 1px solid var(--border); font-size: 0.8rem;">FECHA:</th>
                    <th colspan="6" style="text-align: left; padding: 10px; color: var(--accent-primary); border-bottom: 1px solid var(--border); font-size: 0.8rem;">${dateStr}</th>
                </tr>
                <tr style="background: var(--bg-sidebar); font-size: 0.85rem;">
                    <th style="width: 60px; text-align: center;">N°</th>
                    <th style="min-width: 200px;">EVENTO / FECHA-HORA</th>
                    <th>SECTOR</th>
                    <th style="width: 150px;">PERSONAL EMPLEADO</th>
                    <th style="width: 150px;">VEHÍCULOS</th>
                    <th>NOVEDAD / CAMBIOS</th>
                    <th style="width: 100px;">ACCIONES</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        events.forEach((event, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="text-align: center; font-weight: bold; border: 1px solid var(--border); padding: 8px;">${index + 1}</td>
                <td style="font-weight: 500; border: 1px solid var(--border); padding: 8px;">${event.evento} ${event.fechaHora}</td>
                <td style="font-size: 0.85rem; border: 1px solid var(--border); padding: 8px;">${event.sector}</td>
                <td style="border: 1px solid var(--border); padding: 8px;">${event.personal}</td>
                <td style="border: 1px solid var(--border); padding: 8px;">${event.vehiculos}</td>
                <td style="font-size: 0.85rem; color: var(--text-muted); border: 1px solid var(--border); padding: 8px;">${event.novedad || '-'}</td>
                <td class="table-actions" style="border: 1px solid var(--border); text-align: center; padding: 8px;">
                    <button class="btn-action edit" onclick="openOpsModal('${event.id}')" title="Editar">✏️</button>
                    <button class="btn-action delete" onclick="deleteOpsEvent('${event.id}')" title="Eliminar">🗑️</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        tableWrapper.appendChild(table);
        container.appendChild(tableWrapper);
    });
}

function renderVehicleSelectionList(selectedPlatesString = "") {
    const container = document.getElementById('opsVehiculosContainer');
    if (!container) return;

    container.innerHTML = '';
    const selectedPlates = selectedPlatesString ? selectedPlatesString.split(',').map(s => s.trim()) : [];

    // Vehículos "disponibles" son los que están marcados como tales en logística
    const availableVehicles = vehicles.filter(v => v.available);

    if (availableVehicles.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; font-size: 0.8rem; color: var(--text-muted); text-align: center;">No hay vehículos disponibles en logística</p>';
        updateVehicleAvailabilityCounter(0, 0);
        return;
    }

    availableVehicles.forEach(v => {
        const isChecked = selectedPlates.includes(v.plate);
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '8px';
        div.style.padding = '4px';
        div.style.border = '1px solid transparent';
        div.style.borderRadius = '4px';
        div.style.cursor = 'pointer';
        div.style.transition = 'all 0.2s';

        div.innerHTML = `
            <input type="checkbox" class="ops-vehicle-check" value="${v.plate}" ${isChecked ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer;">
            <div style="display: flex; flex-direction: column; overflow: hidden;">
                <span style="font-size: 0.8rem; font-weight: 700; color: white; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${v.plate}</span>
                <span style="font-size: 0.65rem; color: var(--text-muted); white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${v.type} - ${v.brand}</span>
            </div>
        `;

        // Toggle checkbox on div click (optional but nice)
        div.onclick = (e) => {
            if (e.target.tagName !== 'INPUT') {
                const cb = div.querySelector('input');
                cb.checked = !cb.checked;
                updateVehicleAvailabilityCounter();
            }
        };

        // Update counter when checkbox changes
        const cb = div.querySelector('input');
        cb.onchange = () => updateVehicleAvailabilityCounter();

        container.appendChild(div);
    });

    updateVehicleAvailabilityCounter();
}

function updateVehicleAvailabilityCounter() {
    const total = vehicles.filter(v => v.available).length;
    const selected = document.querySelectorAll('.ops-vehicle-check:checked').length;
    const counter = document.getElementById('availableVehiclesCount');
    if (counter) {
        counter.textContent = `Seleccionados: ${selected} / Disponibles: ${total}`;
    }
}

function openOpsModal(eventId = null) {
    const modal = document.getElementById('addOpsEventModal');
    const form = document.getElementById('opsEventForm');
    const title = document.getElementById('opsModalTitle');
    const districtSelect = document.getElementById('opsDistrito');

    form.reset();
    document.getElementById('editOpsId').value = '';

    // Población dinámica del select de Distrito basado en Puestos Activos
    if (districtSelect) {
        // Limpiar opciones previas pero mantener la primera
        while (districtSelect.options.length > 1) {
            districtSelect.remove(1);
        }

        // Obtener todos los puestos activos de la sección de Distribución
        const activeToggles = document.querySelectorAll('.loc-toggle:checked');
        activeToggles.forEach(toggle => {
            const option = document.createElement('option');
            option.value = toggle.value;
            option.textContent = toggle.value;
            districtSelect.appendChild(option);
        });
    }

    if (eventId) {
        title.textContent = 'Editar Evento Operativo';
        const event = opsEvents.find(e => e.id === eventId);
        if (event) {
            document.getElementById('editOpsId').value = event.id;
            document.getElementById('opsEvento').value = event.evento;
            document.getElementById('opsFechaHora').value = event.fechaHora;
            document.getElementById('opsDistrito').value = event.distrito;
            document.getElementById('opsSector').value = event.sector;
            document.getElementById('opsPersonal').value = event.personal;
            // Manejar la lista de vehículos seleccionados
            renderVehicleSelectionList(event.vehiculos || "");
            document.getElementById('opsNovedad').value = event.novedad || '';
        }
    } else {
        title.textContent = 'Nuevo Evento Operativo';
        renderVehicleSelectionList(""); // Vacío para nuevo

        // Intentar auto-completar desde la distribución actual
        let detectedDistrict = '';
        let detectedShift = '';

        // 1. Buscar distrito predominante en el personal seleccionado
        const currentPool = personnel.filter(p => {
            if (selectedWatchGroup === 'both') return true;
            if (selectedWatchGroup === 'babor') return baborPersonnel.includes(p.id);
            if (selectedWatchGroup === 'estribor') return estriborPersonnel.includes(p.id);
            return true;
        });

        if (currentPool.length > 0) {
            const units = currentPool.map(p => p.unit).filter(u => u && u !== 'N/A');
            if (units.length > 0) {
                const counts = units.reduce((acc, u) => { acc[u] = (acc[u] || 0) + 1; return acc; }, {});
                detectedDistrict = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            }
        }

        // 2. Buscar turno predominante en las asignaciones actuales
        if (guardAssignments.length > 0) {
            const shifts = guardAssignments.map(a => a.assignedTime).filter(t => t);
            if (shifts.length > 0) {
                const counts = shifts.reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {});
                detectedShift = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            }
        }

        if (detectedDistrict) document.getElementById('opsDistrito').value = detectedDistrict;

        if (detectedShift) {
            // Mapear el formato de la distribución al formato de la lista desplegable
            const shiftMap = {
                "0800-1200 / 2000-0000": "08H00 A 12H00 / 20H00 A 00H00",
                "1200-1600 / 0000-0400": "12H00 A 16H00 / 00H00 A 04H00",
                "1600-2000 / 0400-0800": "16H00 A 20H00 / 04H00 A 08H00",
                "CONTROL TOQUE DE QUEDA": "CONTROL TOQUE DE QUEDA"
            };
            const mappedShift = shiftMap[detectedShift] || detectedShift;
            document.getElementById('opsFechaHora').value = mappedShift;
        }

        // Auto-calcular personal según lo detectado
        updateOpsPersonnelAutoFill();
    }

    modal.style.display = 'flex';
}

function closeOpsModal() {
    document.getElementById('addOpsEventModal').style.display = 'none';
}

function saveOpsEvent(e) {
    e.preventDefault();

    const eventId = document.getElementById('editOpsId').value;
    const eventData = {
        id: eventId || 'ops_' + Date.now(),
        evento: document.getElementById('opsEvento').value,
        fechaHora: document.getElementById('opsFechaHora').value,
        distrito: document.getElementById('opsDistrito').value,
        sector: document.getElementById('opsSector').value,
        personal: document.getElementById('opsPersonal').value,
        // Recolectar vehículos seleccionados
        vehiculos: Array.from(document.querySelectorAll('.ops-vehicle-check:checked')).map(cb => cb.value).join(', '),
        novedad: document.getElementById('opsNovedad').value
    };

    if (eventId) {
        const index = opsEvents.findIndex(e => e.id === eventId);
        if (index !== -1) opsEvents[index] = eventData;
        showNotification('Evento actualizado correctamente');
    } else {
        opsEvents.push(eventData);
        showNotification('Evento guardado correctamente');
    }

    localStorage.setItem('opsEvents', JSON.stringify(opsEvents));
    renderOpsPlanningTable();
    closeOpsModal();
}

function deleteOpsEvent(eventId) {
    if (confirm('¿Estás seguro de eliminar este evento planificado?')) {
        opsEvents = opsEvents.filter(e => e.id !== eventId);
        localStorage.setItem('opsEvents', JSON.stringify(opsEvents));
        renderOpsPlanningTable();
        showNotification('Evento eliminado');
    }
}

function exportDistributionToPDF() {
    const allAssignments = [...specialAssignments, ...guardAssignments];
    if (allAssignments.length === 0) {
        showNotification('No hay una distribución generada para exportar.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4'); // Retrato suele ser mejor para listas largas, pero usaremos el espacio eficientemente

    // Título del PDF
    doc.setFontSize(16);
    doc.text('GT 100.51 - CUADRO DE DISTRIBUCIÓN DE PERSONAL', 14, 20);
    doc.setFontSize(9);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 26);

    const shiftsResources = [
        { name: "TURNO 1", time: "0800-1200 / 2000-0000" },
        { name: "TURNO 2", time: "1200-1600 / 0000-0400" },
        { name: "TURNO 3", time: "1600-2000 / 0400-0800" }
    ];

    let currentY = 32;
    const finalData = [];

    // Helper para agregar filas al array final con formato
    const addSectionData = (title, items, color) => {
        if (items.length === 0) return;

        // Fila de Encabezado de Sección (Shift)
        finalData.push({
            isHeader: true,
            content: title.toUpperCase(),
            color: color
        });

        const uniqueLocs = [...new Set(items.map(m => m.assignedLocation))];
        uniqueLocs.forEach(locName => {
            const locMembers = items.filter(m => m.assignedLocation === locName);

            // Fila de Encabezado de Puesto
            finalData.push({
                isSubHeader: true,
                content: `${locName} (${locMembers[0].assignedTime || ""})`,
                color: color
            });

            // Filas de Personal
            locMembers.forEach(p => {
                finalData.push({
                    isRow: true,
                    data: [p.grade, p.specialty || "N/A", p.name, p.idNum || "S/N", p.contact || "S/N"]
                });
            });
        });
    };

    // Recopilar datos en el orden de la tabla
    addSectionData("TAREAS DE APOYO (CUOTAS FIJAS)", specialAssignments, [239, 68, 68]);

    const tqMembers = guardAssignments.filter(d => d.assignedShift === "CONTROL TOQUE DE QUEDA");
    addSectionData("CONTROL TOQUE DE QUEDA", tqMembers, [245, 158, 11]);

    shiftsResources.forEach(shift => {
        const shiftMembers = guardAssignments.filter(d => d.assignedShift === shift.name);
        addSectionData(`${shift.name} (${shift.time})`, shiftMembers, [14, 165, 233]);
    });

    // Renderizar con autoTable
    doc.autoTable({
        startY: currentY,
        head: [['Grado', 'Especialidad', 'Nombres y Apellidos', 'Cédula', 'Contacto']],
        body: finalData.filter(f => f.isRow).map(f => f.data), // Fallback por si falla el hook
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },

        // Magia para los encabezados personalizados
        didParseCell: function (data) {
            const rowIndex = data.row.index;
            // No podemos usar el body filtrado aquí fácilmente, así que reconstruiremos la lógica de filas
        }
    });

    // RE-IMPLEMENTACIÓN MÁS SEGURA: Múltiples tablas o filas extendidas
    // Vamos a usar una sola tabla pero con hooks para dibujar las cabeceras

    // Resetear doc para una implementación limpia por bloques (evita problemas de hooks complejos)
    const docClean = new jsPDF('p', 'mm', 'a4');
    docClean.setFontSize(16);
    docClean.text('GT 100.51 - CUADRO DE DISTRIBUCIÓN DE PERSONAL', 14, 15);
    docClean.setFontSize(9);
    docClean.text(`Generado el: ${new Date().toLocaleString()}`, 14, 21);

    let startY = 25;

    const renderBlock = (title, items, mainColor, lightColor) => {
        if (items.length === 0) return;

        // Título de Sección
        docClean.setFillColor(...mainColor);
        docClean.rect(14, startY, 182, 8, 'F');
        docClean.setTextColor(255, 255, 255);
        docClean.setFontSize(10);
        docClean.setFont(undefined, 'bold');
        docClean.text(title, 105, startY + 5.5, { align: 'center' });
        startY += 8;

        const uniqueLocs = [...new Set(items.map(m => m.assignedLocation))];
        uniqueLocs.forEach(locName => {
            const locMembers = items.filter(m => m.assignedLocation === locName);
            const time = locMembers[0].assignedTime || "";

            // Título de Puesto
            docClean.setFillColor(...lightColor);
            docClean.rect(14, startY, 182, 6, 'F');
            docClean.setTextColor(...mainColor);
            docClean.setFontSize(9);
            docClean.text(`${locName} ${time ? ' - ' + time : ''}`, 18, startY + 4.5);
            startY += 6;

            const rows = locMembers.map(p => [p.grade, p.specialty || "N/A", p.name, p.idNum || "S/N", p.unit || "N/A", p.contact || "S/N"]);

            docClean.autoTable({
                startY: startY,
                head: [['Grado', 'Especialidad', 'Nombres y Apellidos', 'Cédula', 'Reparto', 'Contacto']],
                body: rows,
                theme: 'grid',
                styles: { fontSize: 7, cellPadding: 1.5 },
                headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
                margin: { left: 14, right: 14 },
                didDrawPage: (data) => {
                    // Actualizar startY después de la tabla
                    startY = data.cursor.y + 5;
                }
            });

            // Sincronizar startY real después de cada autoTable
            startY = docClean.lastAutoTable.finalY + 4;

            // Manejo de nueva página si el espacio es poco
            if (startY > 270) {
                docClean.addPage();
                startY = 35;
            }
        });
        startY += 2;
    };

    renderBlock("TAREAS DE APOYO", specialAssignments, [239, 68, 68], [254, 242, 242]);

    if (tqMembers.length > 0) {
        renderBlock("CONTROL TOQUE DE QUEDA", tqMembers, [245, 158, 11], [255, 251, 235]);
    }

    shiftsResources.forEach(shift => {
        const shiftMembers = guardAssignments.filter(d => d.assignedShift === shift.name);
        if (shiftMembers.length > 0) {
            renderBlock(`${shift.name} (${shift.time})`, shiftMembers, [14, 165, 233], [240, 249, 255]);
        }
    });

    docClean.save('Distribucion_Personal_GT100.51.pdf');
}

function updateUI() {
    document.getElementById('totalCrimes').textContent = crimes.length;
    document.getElementById('dashTotal').textContent = crimes.length;

    // Actualizar nombre de operación en el nav
    const opDisplay = document.getElementById('currentOperationalDate');
    if (opDisplay) {
        opDisplay.textContent = `OPERACIÓN: ${operationName}`;
    }
}

function toggleDashboard(show) {
    const overlay = document.getElementById('dashboardOverlay');
    if (show) {
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('show'), 10);
        updateDashboard();
    } else {
        overlay.classList.remove('show');
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

function updateDashboard() {
    const districtStatsContainer = document.getElementById('dashDistricts');
    if (!districtStatsContainer) return;
    districtStatsContainer.innerHTML = '';

    // Agrupar por distrito
    const summary = {};
    const districts = ['SUR', 'ESTEROS', '9 DE OCTUBRE'];
    districts.forEach(d => summary[d] = 0);

    crimes.forEach(c => {
        if (summary[c.district] !== undefined) {
            summary[c.district]++;
        }
    });

    // Renderizar resumen por distrito
    districts.forEach(d => {
        const row = document.createElement('div');
        row.className = 'district-row';
        row.innerHTML = `
            <span class="district-name">${d}</span>
            <span class="district-count">${summary[d]}</span>
        `;
        districtStatsContainer.appendChild(row);
    });

    // Gráfico de Barras con Chart.js
    const ctx = document.getElementById('crimeChart').getContext('2d');

    if (crimeChart) {
        crimeChart.destroy();
    }

    crimeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: districts,
            datasets: [{
                label: 'Incidentes',
                data: districts.map(d => summary[d]),
                backgroundColor: [
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(34, 197, 94, 0.7)'
                ],
                borderColor: [
                    '#0ea5e9',
                    '#ef4444',
                    '#22c55e'
                ],
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#94a3b8', stepSize: 1 },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    ticks: { color: '#94a3b8', font: { size: 10 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function saveData() {
    localStorage.setItem('gyecrimes', JSON.stringify(crimes));
    localStorage.setItem('gyepersonal', JSON.stringify(personnel));
    localStorage.setItem('guardAssignments', JSON.stringify(guardAssignments));
    localStorage.setItem('specialAssignments', JSON.stringify(specialAssignments));
    localStorage.setItem('opsEvents', JSON.stringify(opsEvents));
    localStorage.setItem('instantOps', JSON.stringify(instantOps));
    localStorage.setItem('gyevehicles', JSON.stringify(vehicles));
    localStorage.setItem('patrolOrders', JSON.stringify(patrolOrders));
}

function formatDoc(cmd, value = null) {
    if (value) {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd, false, null);
    }
}

function populateAnexoBPuestosSelector() {
    const container = document.getElementById('ioPuestosSelector');
    if (!container) return;
    container.innerHTML = '';

    // Build unique list of posts from guardAssignments + specialAssignments
    const all = [...(specialAssignments || []), ...(guardAssignments || [])];
    const uniquePosts = [...new Set(all.map(a => a.assignedLocation).filter(Boolean))];

    if (uniquePosts.length === 0) {
        container.innerHTML = '<small style="color:var(--text-muted);">No hay puestos activados actualmente.</small>';
        return;
    }

    uniquePosts.sort().forEach(post => {
        const label = document.createElement('label');
        label.style.cssText = 'display:flex; align-items:center; gap:5px; background:rgba(255,255,255,0.05); border:1px solid var(--border); padding:4px 10px; border-radius:20px; cursor:pointer; font-size:0.78rem; white-space:nowrap; color:white;';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = post;
        checkbox.id = 'post_' + post.replace(/\s+/g, '_');
        checkbox.style.accentColor = 'var(--accent-primary)';
        checkbox.addEventListener('change', updateAnexoBPreview);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(post));
        container.appendChild(label);
    });

    updateAnexoBPreview();
}

function updateAnexoBPreview() {
    const preview = document.getElementById('ioPersonnelPreview');
    if (!preview) return;

    const selectedPosts = getSelectedAnexBPosts();
    if (selectedPosts.length === 0) {
        preview.innerHTML = '<em style="color:var(--text-muted);">Ningún puesto seleccionado.</em>';
        return;
    }

    const all = [...(specialAssignments || []), ...(guardAssignments || [])];
    const filtered = all.filter(a => selectedPosts.includes(a.assignedLocation));

    if (filtered.length === 0) {
        preview.innerHTML = '<em style="color:var(--text-muted);">Sin personal registrado en esos puestos.</em>';
        return;
    }

    // Group by post
    const byPost = {};
    filtered.forEach(p => {
        const loc = p.assignedLocation || 'SIN PUESTO';
        if (!byPost[loc]) byPost[loc] = [];
        byPost[loc].push(p);
    });

    let html = '';
    Object.entries(byPost).forEach(([post, members]) => {
        html += `<div style="margin-bottom:6px;"><strong style="color:var(--accent-primary);">${post}</strong>: `;
        html += members.map(m => `${m.grade || ''} ${m.name}`).join(' / ');
        html += `</div>`;
    });
    preview.innerHTML = html;
}

function getSelectedAnexBPosts() {
    const container = document.getElementById('ioPuestosSelector');
    if (!container) return [];
    return Array.from(container.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
}

function setSelectedAnexBPosts(posts) {
    const container = document.getElementById('ioPuestosSelector');
    if (!container) return;
    container.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.checked = posts.includes(cb.value);
    });
    updateAnexoBPreview();
}

function handleInstantReportSubmit(e) {
    e.preventDefault();

    const latVal = parseFloat(document.getElementById('ioLatInput').value);
    const lngVal = parseFloat(document.getElementById('ioLngInput').value);

    if (document.getElementById('ioLatInput').value && isNaN(latVal)) {
        alert('Por favor, ingrese coordenadas válidas (Latitud y Longitud o déjelo en blanco).');
        return;
    }

    // Asegurar que el número de reporte esté completo
    let reportNum = document.getElementById('ioReportNum').value.trim();
    if (!reportNum) {
        // Generar automáticamente en el formato CGT. 100.51-CDO-031824R-ABR-2026-R
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = now.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
        const year = now.getFullYear();
        const hour = now.getHours().toString().padStart(2, '0');
        const min = now.getMinutes().toString().padStart(2, '0');
        reportNum = `CGT. 100.51-CDO-${day}${hour}${min}R-${month}-${year}-R`;
        document.getElementById('ioReportNum').value = reportNum;
    }

    const newOp = {
        id: editingInstantOpId || ('op_' + Date.now()),
        reportNum: reportNum,
        precedencia: document.getElementById('ioPrecedencia').value,
        lugar: document.getElementById('ioLugar').value,
        destinatario: document.getElementById('ioDestinatario').value,
        copia: document.getElementById('ioCopia').value,
        btNarrative: document.getElementById('ioBTNarrative').value,
        ref: document.getElementById('ioRef').value,
        resultadosRich: document.getElementById('ioResultadosRich').innerHTML, // Contenido con formato
        quien: document.getElementById('ioQuien').value,
        patrulla: document.getElementById('ioPatrulla').value,
        date: document.getElementById('ioDate').value,
        como: document.getElementById('ioComo').value,
        donde: document.getElementById('ioDondeManual').value,
        acciones: document.getElementById('ioAccionesTomadas').value,
        lat: isNaN(latVal) ? null : latVal,
        lng: isNaN(lngVal) ? null : lngVal,
        photos: currentInstantOpsPhotos.slice(),
        annexBPosts: getSelectedAnexBPosts(),
        annexBPersonnel: (() => {
            const posts = getSelectedAnexBPosts();
            const all = [...(specialAssignments || []), ...(guardAssignments || [])];
            return all
                .filter(a => posts.includes(a.assignedLocation))
                .map(p => ({ grade: p.grade || '', name: p.name || '', location: p.assignedLocation, shift: p.assignedShift || '' }));
        })()
    };

    if (editingInstantOpId) {
        const index = instantOps.findIndex(o => o.id === editingInstantOpId);
        if (index !== -1) {
            instantOps[index] = newOp;
        }
    } else {
        instantOps.push(newOp);
    }

    saveData();
    refreshHeatLayer();
    refreshMarkers();
    renderInstantOpsTable();

    // Reset form
    document.getElementById('instantOpsForm').reset();
    document.getElementById('ioResultadosRich').innerHTML = '';
    document.getElementById('ioDondeManual').value = '';
    document.getElementById('ioLatInput').value = '';
    document.getElementById('ioLngInput').value = '';
    document.getElementById('ioDate').value = '';

    // Clear photos
    currentInstantOpsPhotos = [];
    const previewContainer = document.getElementById('ioPhotosPreview');
    if (previewContainer) previewContainer.innerHTML = '';

    // Reset Anexo B selection
    const puestosContainer = document.getElementById('ioPuestosSelector');
    if (puestosContainer) puestosContainer.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
    updateAnexoBPreview();

    editingInstantOpId = null;
    updateOfficialReportNum();
    selectedLatLng = null;

    showNotification(`Parte Oficial ${newOp.reportNum} guardado con éxito`);
}

function generateInstantReportFromCrime(id) {
    const crime = crimes.find(c => c.id === id);
    if (!crime) return;

    // 1. Cambiar a la vista de Partes al Instante
    // Simular el clic en el botón del sub-menú para que se aplique toda la lógica de UI
    const intelBtn = document.querySelector('.menu-btn[data-target="inteligencia"]');
    if (intelBtn && !intelBtn.classList.contains('active')) {
        intelBtn.click();
    }

    const reportSubBtn = document.querySelector('.sub-menu-btn[data-view="instantOpsView"]');
    if (reportSubBtn) {
        reportSubBtn.click();
    }

    // 2. Pre-llenar el formulario
    document.getElementById('ioRef').value = `REPORTE DE INCIDENTE: ${crime.type.toUpperCase()}`;
    document.getElementById('ioDate').value = crime.date;
    document.getElementById('ioLatInput').value = crime.lat.toFixed(6);
    document.getElementById('ioLngInput').value = crime.lng.toFixed(6);
    document.getElementById('ioDondeManual').value = `DISTRITO ${crime.district || 'S/N'}`;

    // Contenido enriquecido para Resultados
    const resultadosEditor = document.getElementById('ioResultadosRich');
    if (resultadosEditor) {
        resultadosEditor.innerHTML = `<div><b>DETALLES DEL INCIDENTE:</b></div><div>${crime.observation || 'Sin observaciones registradas.'}</div>`;
    }

    // Campos por defecto para inteligencia
    document.getElementById('ioQuien').value = "INTELIGENCIA / GT 100.51";
    document.getElementById('ioResultadosRich').focus();

    showNotification('Datos del incidente cargados en el formulario de Parte Oficial');
}

function updateOfficialReportNum() {
    const numInput = document.getElementById('ioReportNum');
    if (!numInput) return;

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');

    // Formato: CGT. 100.51-CDO-141730R-MAR-2026-R
    const officialNum = `CGT. 100.51-CDO-${day}${hour}${min}R-${month}-${year}-R`;
    numInput.value = officialNum;
}

function renderInstantOpsTable() {
    const tableBody = document.getElementById('tableBodyInstantOps');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    // Mostrar más recientes primero — sort por ID (que codifica el timestamp de creación)
    const sortedOps = [...instantOps].sort((a, b) => {
        const tsA = parseInt((a.id || '').replace('op_', '')) || 0;
        const tsB = parseInt((b.id || '').replace('op_', '')) || 0;
        return tsB - tsA;
    });

    sortedOps.forEach(op => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.onclick = (e) => {
            if (e.target.closest('.table-actions')) return;
            focusOnIncident(op.id);
        };

        row.innerHTML = `
            <td style="font-weight: 700; color: white;">${op.reportNum || 'S/N'}</td>
            <td style="font-size: 0.8rem; max-width: 150px; overflow: hidden; text-overflow: ellipsis;">${op.ref || '---'}</td>
            <td>${op.donde || '---'}</td>
            <td>${op.date || '---'}</td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.8rem;">
                ${op.resultadosRich ? stripHtmlForPDF(op.resultadosRich).substring(0, 50) + '...' : '---'}
            </td>
            <td class="table-actions">
                <button class="btn-action edit" onclick="editInstantOp('${op.id}')" title="Modificar">✏️</button>
                <button class="btn-action edit" onclick="generateOfficialDetailedPDF('${op.id}')" title="Generar PDF Oficial">📄</button>
                <button class="btn-action delete" onclick="deleteInstantOp('${op.id}')" title="Eliminar">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

window.editInstantOp = function (id) {
    const op = instantOps.find(o => o.id === id);
    if (!op) return;

    editingInstantOpId = id;

    // Obtener y simular clics para cambiar a la vista correcta si fuera necesario
    const intelBtn = document.querySelector('.menu-btn[data-target="inteligencia"]');
    if (intelBtn && !intelBtn.classList.contains('active')) intelBtn.click();
    const reportSubBtn = document.querySelector('.sub-menu-btn[data-view="instantOpsView"]');
    if (reportSubBtn) reportSubBtn.click();

    // Poblar formulario
    document.getElementById('ioReportNum').value = op.reportNum || '';
    document.getElementById('ioPrecedencia').value = op.precedencia || 'R';
    document.getElementById('ioLugar').value = op.lugar || '';
    document.getElementById('ioDestinatario').value = op.destinatario || '';
    document.getElementById('ioCopia').value = op.copia || '';
    document.getElementById('ioBTNarrative').value = op.btNarrative || '';
    document.getElementById('ioRef').value = op.ref || '';
    document.getElementById('ioResultadosRich').innerHTML = op.resultadosRich || '';
    document.getElementById('ioQuien').value = op.quien || '';
    document.getElementById('ioPatrulla').value = op.patrulla || '';
    document.getElementById('ioDate').value = op.date || '';
    document.getElementById('ioComo').value = op.como || '';
    document.getElementById('ioDondeManual').value = op.donde || '';
    document.getElementById('ioAccionesTomadas').value = op.acciones || '';
    document.getElementById('ioLatInput').value = op.lat ? op.lat.toFixed(6) : '';
    document.getElementById('ioLngInput').value = op.lng ? op.lng.toFixed(6) : '';

    currentInstantOpsPhotos = op.photos ? op.photos.slice() : [];
    const previewContainer = document.getElementById('ioPhotosPreview');
    if (previewContainer) {
        previewContainer.innerHTML = '';
        currentInstantOpsPhotos.forEach(base64 => {
            const img = document.createElement('img');
            img.src = base64;
            img.style.height = '60px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '4px';
            img.style.border = '1px solid var(--border)';
            previewContainer.appendChild(img);
        });
    }

    // Restore Anexo B posts
    populateAnexoBPuestosSelector();
    if (op.annexBPosts && op.annexBPosts.length > 0) {
        setSelectedAnexBPosts(op.annexBPosts);
    }

    const formElement = document.getElementById('instantOpsForm');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
    showNotification('Datos cargados para modificación');
};

function generateOfficialDetailedPDF(id) {
    const op = instantOps.find(o => o.id === id);
    if (!op) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 20;
    const pageWidth = 210;
    let currentY = 15;

    // --- Header "SECRETO" ---
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(239, 68, 68);
    doc.text('SECRETO', pageWidth / 2, currentY, { align: 'center' });
    currentY += 8;

    // --- Escudo Institucional ---
    const shieldSize = 22;
    const shieldX = (pageWidth - shieldSize) / 2;
    if (escudoBase64) {
        try { doc.addImage(escudoBase64, 'JPEG', shieldX, currentY, shieldSize, shieldSize); } catch (e) { }
    } else {
        doc.setDrawColor(0); doc.setLineWidth(0.3);
        doc.circle(pageWidth / 2, currentY + 11, 12, 'S');
    }
    currentY += shieldSize + 4;

    // --- Institutional Text ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('ARMADA DEL ECUADOR', pageWidth / 2, currentY, { align: 'center' });
    currentY += 6;
    doc.text('GRUPO DE TAREA 100.51', pageWidth / 2, currentY, { align: 'center' });
    currentY += 6;
    doc.text('“SEGURIDAD MARÍTIMA”', pageWidth / 2, currentY, { align: 'center' });
    currentY += 11;

    doc.setFontSize(12);
    doc.text('PARTE AL INSTANTE', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;

    // --- Metadata Section (Top) ---
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('NÚMERO:', margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(op.reportNum || '', margin + 25, currentY);

    doc.setFont(undefined, 'bold');
    doc.text('PRECEDENCIA:', pageWidth - 60, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(op.precedencia || 'U', pageWidth - 30, currentY);
    currentY += 5;

    doc.setFont(undefined, 'bold');
    doc.text('LUGAR:', margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(op.lugar || 'GUAYAQUIL', margin + 25, currentY);
    currentY += 5;

    doc.setFont(undefined, 'bold');
    doc.text('DESTINATARIO:', margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(op.destinatario || 'COOPNA', margin + 25, currentY);
    currentY += 5;

    doc.setFont(undefined, 'bold');
    doc.text('COPIA:', margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(op.copia || 'ARCHIVO', margin + 25, currentY);
    currentY += 10;

    // --- BT Narrative ---
    const btText = op.btNarrative || `BT. CÚMPLEME INFORMAR A USTED SEÑOR ALMIRANTE, LA NOVEDAD SUSCITADA EN LA JURISDICCIÓN DEL GT-100.51 “SEGURIDAD MARÍTIMA”, SEGÚN EL SIGUIENTE DETALLE:`;
    const splitBt = doc.splitTextToSize(btText, pageWidth - (margin * 2));
    doc.text(splitBt, margin, currentY);
    currentY += (splitBt.length * 5) + 5;

    // --- Official Detailed Table ---
    doc.autoTable({
        startY: currentY,
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: 0,
            lineColor: [0, 0, 0],
            lineWidth: 0.1
        },
        columnStyles: {
            0: { cellWidth: 45, fontStyle: 'bold', fillColor: [245, 245, 245] },
            1: { cellWidth: pageWidth - (margin * 2) - 45 }
        },
        body: [
            ['REF.', op.ref || '---'],
            ['RESULTADOS', stripHtmlForPDF(op.resultadosRich || 'NINGUNA')],
            ['QUIÉN:', op.quien || 'EL GT-100.51'],
            ['PATRULLA\nINVOLUCRADA:', op.patrulla || '---'],
            ['CÓMO:', op.como || '---'],
            ['CUÁNDO:', op.date || '---'],
            ['DÓNDE:', `${op.donde || '---'}\nCOORDENADAS: LAT ${op.lat ? op.lat.toFixed(6) : 'S/N'} LONG ${op.lng ? op.lng.toFixed(6) : 'S/N'}`],
            ['ACCIONES\nTOMADAS:', op.acciones || '---']
        ],
        margin: { left: margin, right: margin },
        didDrawPage: function () {
            // Each additional page: SECRETO footer + mini header
            const pn = doc.internal.getNumberOfPages();
            if (pn > 1) {
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(239, 68, 68);
                doc.text('SECRETO', pageWidth / 2, 285, { align: 'center' });
                // mini escudo on continuation pages
                if (escudoBase64) {
                    try { doc.addImage(escudoBase64, 'JPEG', margin, 5, 12, 12); } catch (e) { }
                }
            }
        }
    });

    currentY = doc.lastAutoTable.finalY + 30;

    // --- Signature Block ---
    if (currentY > 260) { doc.addPage(); currentY = 30; }
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('__________________________', pageWidth / 2, currentY, { align: 'center' });
    currentY += 6;
    doc.text('COMANDANTE DE LA UT 100.51.4', pageWidth / 2, currentY, { align: 'center' });

    // --- ANEXO A: Fotografías ---
    if (op.photos && op.photos.length > 0) {
        doc.addPage();
        let annexY = 20;

        doc.setFontSize(13);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('ANEXO A - FOTOGRÁFICO', pageWidth / 2, annexY, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(`(Imágenes del Parte Oficial ${op.reportNum})`, pageWidth / 2, annexY + 5, { align: 'center' });
        annexY += 15;

        const colWidth = 80;
        const colGap = 10;
        const rowHeight = 60;
        let isLeftCol = true;
        const leftX = (pageWidth - (colWidth * 2 + colGap)) / 2;
        const rightX = leftX + colWidth + colGap;

        op.photos.forEach((photo) => {
            if (annexY + rowHeight > 265) {
                doc.addPage();
                annexY = 20;
                isLeftCol = true;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text('ANEXO A - FOTOGRÁFICO (Cont.)', pageWidth / 2, annexY, { align: 'center' });
                annexY += 12;
            }
            const x = isLeftCol ? leftX : rightX;
            try {
                let format = 'JPEG';
                if (photo.startsWith('data:image/')) {
                    format = photo.substring(11, photo.indexOf(';')).toUpperCase();
                }
                if (format === 'SVG+XML') format = 'SVG';
                doc.addImage(photo, format, x, annexY, colWidth, rowHeight);
            } catch (e) { console.error('Error adding image to PDF', e); }
            if (!isLeftCol) annexY += rowHeight + 10;
            isLeftCol = !isLeftCol;
        });
    }

    // --- ANEXO B: Personal Participante ---
    if (op.annexBPersonnel && op.annexBPersonnel.length > 0) {
        doc.addPage();
        let bY = 20;

        doc.setFontSize(13);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('ANEXO B - PERSONAL PARTICIPANTE EN LA OPERACIÓN', pageWidth / 2, bY, { align: 'center' });
        bY += 6;
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(`Parte Oficial: ${op.reportNum}  |  Fecha: ${op.date || 'S/F'}`, pageWidth / 2, bY, { align: 'center' });
        bY += 8;

        // Group by post
        const byPost = {};
        op.annexBPersonnel.forEach(p => {
            const loc = p.location || 'SIN PUESTO';
            if (!byPost[loc]) byPost[loc] = [];
            byPost[loc].push(p);
        });

        Object.entries(byPost).forEach(([post, members]) => {
            const tableRows = members.map((m, idx) => [
                idx + 1,
                m.grade || '---',
                m.name || '---',
                m.shift || '---'
            ]);

            doc.autoTable({
                startY: bY,
                head: [[{ content: post, colSpan: 4, styles: { fillColor: [30, 60, 90], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center', fontSize: 9 } }],
                ['N°', 'GRADO', 'NOMBRES Y APELLIDOS', 'TURNO ASIGNADO']],
                body: tableRows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 3, textColor: 0, lineColor: [0, 0, 0], lineWidth: 0.1 },
                headStyles: { fillColor: [45, 90, 130], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
                columnStyles: {
                    0: { cellWidth: 12, halign: 'center' },
                    1: { cellWidth: 30 },
                    2: { cellWidth: pageWidth - (margin * 2) - 12 - 30 - 40 },
                    3: { cellWidth: 40 }
                },
                margin: { left: margin, right: margin }
            });
            bY = doc.lastAutoTable.finalY + 8;
        });

        // Total
        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        doc.text(`TOTAL PERSONAL: ${op.annexBPersonnel.length} efectivos`, margin, bY + 5);
    }

    doc.save(`Parte_Oficial_${op.reportNum.replace(/[/\\?%*:|"<>]/g, '-')}.pdf`);
}

function stripHtmlForPDF(html) {
    if (!html) return '';
    let text = html.replace(/<br\s*[\/]?>/gi, "\n");
    text = text.replace(/<\/div>/gi, "\n");
    text = text.replace(/<\/p>/gi, "\n");
    text = text.replace(/<[^>]+>/g, "");

    // Decodificar entidades básicas
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value.trim();
}

function deleteInstantOp(id) {
    if (confirm('¿Eliminar este parte operativo?')) {
        instantOps = instantOps.filter(op => op.id !== id);
        saveData();
        refreshHeatLayer();
        refreshMarkers();
        renderInstantOpsTable();
        showNotification('Parte operativo eliminado');
    }
}

function exportOpsInstantToExcel() {
    if (instantOps.length === 0) {
        showNotification('No hay partes registrados para exportar.');
        return;
    }

    const data = instantOps.map(op => ({
        "N° Reporte": op.reportNum,
        "Referencia": op.ref,
        "Ubicación (Dónde)": op.donde,
        "Fecha (Cuándo)": op.date,
        "Resultados": stripHtmlForPDF(op.resultadosRich || ''),
        "Latitud": op.lat,
        "Longitud": op.lng,
        "Acciones": op.acciones
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PartesInstante");
    XLSX.writeFile(workbook, `Reporte_Partes_Instante_${new Date().toISOString().split('T')[0]}.xlsx`);
}

function exportOpsInstantToPDF() {
    if (instantOps.length === 0) {
        showNotification('No hay partes registrados para exportar.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    const pageWidth = 297; // A4 Landscape
    let currentY = 15;

    // --- Header Oficial ---
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(239, 68, 68); // Red SECRETO
    doc.text('SECRETO', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text('ARMADA DEL ECUADOR', pageWidth / 2, currentY, { align: 'center' });
    currentY += 4;
    doc.text('GRUPO DE TAREA 100.51 “SEGURIDAD MARÍTIMA”', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;

    doc.setFontSize(14);
    doc.text('REPORTE GENERAL - PARTES AL INSTANTE', pageWidth / 2, currentY, { align: 'center' });
    currentY += 7;
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text(`Generado: ${new Date().toLocaleString()}`, pageWidth / 2, currentY, { align: 'center' });

    const rows = instantOps.map((op, index) => [
        index + 1,
        op.reportNum || '---',
        op.ref || '---',
        op.donde || '---',
        op.date || '---',
        `${op.lat ? op.lat.toFixed(6) : 'S/N'}, ${op.lng ? op.lng.toFixed(6) : 'S/N'}`,
        op.resultadosRich ? stripHtmlForPDF(op.resultadosRich).substring(0, 100) + '...' : '---'
    ]);

    doc.autoTable({
        startY: currentY + 10,
        head: [['N°', 'Reporte', 'Referencia', 'Ubicación', 'Fecha', 'Coordenadas', 'Resultados (Extracto)']],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 2, lineWidth: 0.1, lineColor: [0, 0, 0] },
        headStyles: { fillColor: [45, 45, 45], textColor: [255, 255, 255] },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 45 },
            2: { cellWidth: 40 },
            3: { cellWidth: 50 },
            4: { cellWidth: 35 },
            5: { cellWidth: 30 },
            6: { cellWidth: 60 }
        }
    });

    doc.save(`Reporte_General_Partes_${new Date().toISOString().split('T')[0]}.pdf`);
}

function showNotification(msg) {
    const toast = document.getElementById('notification');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

async function handleKMZUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    showNotification(`Importando ${file.name}...`);

    const reader = new FileReader();
    reader.onload = async function (event) {
        try {
            const data = event.target.result;
            let kmlText = "";

            if (file.name.toLowerCase().endsWith('.kmz')) {
                // Descomprimir KMZ usando JSZip
                const zip = new JSZip();
                const zipContents = await zip.loadAsync(data);
                const kmlFileName = Object.keys(zipContents.files).find(f => f.toLowerCase().endsWith('.kml'));

                if (!kmlFileName) {
                    showNotification("Error: No se encontró KML dentro del KMZ");
                    return;
                }
                kmlText = await zipContents.files[kmlFileName].async("string");
            } else {
                // Leer KML como texto
                const decoder = new TextDecoder();
                kmlText = decoder.decode(data);
            }

            // Crear capa con Omnivore respetando los estilos del KML
            const customLayer = L.geoJson(null, {
                style: function (feature) {
                    const p = feature.properties || {};
                    return {
                        color: p.stroke || '#38bdf8',
                        weight: p['stroke-width'] || 2,
                        opacity: p['stroke-opacity'] || 0.8,
                        fillColor: p.fill || '#38bdf8',
                        fillOpacity: p['fill-opacity'] || 0.3
                    };
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(`<b>Sector:</b> ${feature.properties.name}`);
                    }
                }
            });

            const kmlLayer = omnivore.kml.parse(kmlText, null, customLayer);
            kmlLayer.addTo(map);

            kmlLayer.on('ready', function () {
                const bounds = kmlLayer.getBounds();
                if (bounds.isValid()) {
                    map.fitBounds(bounds);
                }
                if (kmzControl) {
                    kmzControl.addOverlay(kmlLayer, file.name);
                }
                showNotification(`"${file.name}" cargado con sus colores originales`);
            });

        } catch (err) {
            console.error("KMZ Processing Error:", err);
            showNotification("Error al procesar el archivo geográfico");
        }
    };

    reader.readAsArrayBuffer(file);
    e.target.value = '';
}

// Extensión para que los marcadores desaparezcan suavemente
L.Marker.prototype.fadeOut = function (duration = 1000) {
    const self = this;
    let opacity = 1;
    const interval = 50;
    const step = interval / duration;

    const timer = setInterval(() => {
        opacity -= step;
        self.setOpacity(opacity);
        if (opacity <= 0) {
            clearInterval(timer);
            map.removeLayer(self);
        }
    }, interval);
};

L.CircleMarker.prototype.fadeOut = L.Marker.prototype.fadeOut;

function dividePersonnelIntoGroups() {
    if (personnel.length === 0) return;

    // Solo considerar a los operativos para la división de guardias
    const operativos = personnel.filter(p => !p.condition || p.condition === 'OPERATIVO');

    if (operativos.length === 0) {
        showNotification('No hay personal operativo disponible para la división.');
        return;
    }

    // Crear copia y barajar para aleatoriedad inicial (o por jerarquía si se prefiere)
    // Para justicia naval, dividiremos equitativamente intentando que ambos grupos tengan jerarquías similares
    const sortedPersonnel = [...operativos].sort((a, b) => {
        const hierarchy = ["CPNV", "CPFG", "CPCB", "TNNV", "TNFG", "ALFG", "SUBM", "SUBP", "SUBS", "SGOP", "SGOS", "CBOP", "CBOS", "MARO"];
        return hierarchy.indexOf(a.grade) - hierarchy.indexOf(b.grade);
    });

    baborPersonnel = [];
    estriborPersonnel = [];

    sortedPersonnel.forEach((person, index) => {
        if (index % 2 === 0) {
            baborPersonnel.push(person);
        } else {
            estriborPersonnel.push(person);
        }
    });

    localStorage.setItem('baborPersonnel', JSON.stringify(baborPersonnel));
    localStorage.setItem('estriborPersonnel', JSON.stringify(estriborPersonnel));
}

function renderWatchDivision() {
    const baborList = document.getElementById('baborList');
    const estriborList = document.getElementById('estriborList');
    if (!baborList || !estriborList) return;

    // Cargar si están vacíos
    if (personnel.length === 0) {
        baborPersonnel = [];
        estriborPersonnel = [];
    } else {
        if (baborPersonnel.length === 0 && localStorage.getItem('baborPersonnel')) {
            baborPersonnel = JSON.parse(localStorage.getItem('baborPersonnel'));
        }
        if (estriborPersonnel.length === 0 && localStorage.getItem('estriborPersonnel')) {
            estriborPersonnel = JSON.parse(localStorage.getItem('estriborPersonnel'));
        }
    }

    // Actualizar estilo del botón "Seleccionar Ambos"
    const btnBoth = document.getElementById('selectAllGroupsBtn');
    if (btnBoth) {
        if (selectedWatchGroup === 'both') {
            btnBoth.style.boxShadow = '0 0 15px var(--accent-secondary)';
            btnBoth.style.filter = 'brightness(1.2)';
            btnBoth.innerHTML = '<span class="icon">👥</span> Escogido (Ambos) ✓';
        } else {
            btnBoth.style.boxShadow = 'none';
            btnBoth.style.filter = 'none';
            btnBoth.innerHTML = '<span class="icon">👥</span> Seleccionar Ambos';
        }
    }

    const renderGroup = (list, members, groupName) => {
        list.innerHTML = '';
        if (members.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding-top: 2rem;">No hay personal asignado. Haz clic en "Dividir Personal".</p>';
            return;
        }

        const isSelected = selectedWatchGroup === groupName || selectedWatchGroup === 'both';
        const column = list.closest('.group-column');
        const header = column.querySelector('.group-header');
        const selectBtn = header.querySelector('.select-group-btn');

        if (isSelected) {
            column.style.boxShadow = `0 0 20px ${groupName === 'babor' ? 'var(--color-robo)' : 'var(--color-sicariato)'}`;
            if (selectedWatchGroup === 'both') {
                selectBtn.textContent = 'Seleccionado ✓';
                selectBtn.style.opacity = '0.5';
            } else {
                selectBtn.textContent = 'Seleccionado ✓';
                selectBtn.style.opacity = '1';
            }
        } else {
            column.style.boxShadow = 'none';
            selectBtn.textContent = 'Seleccionar';
            selectBtn.style.opacity = '0.7';
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Grado</th>
                    <th>Nombres</th>
                    <th style="text-align: center;">Cambiar</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');

        members.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.grade}</td>
                <td>${p.name}</td>
                <td style="text-align: center;">
                    <button class="btn-action edit" onclick="swapPersonnelGuard(${p.id})" title="Pasar al otro grupo">🔄</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        list.appendChild(table);
    };

    renderGroup(baborList, baborPersonnel, 'babor');
    renderGroup(estriborList, estriborPersonnel, 'estribor');

    // Limpiar inputs de búsqueda al renderizar para evitar inconsistencias
    const bSearch = document.getElementById('baborPersonnelSearch');
    const eSearch = document.getElementById('estriborPersonnelSearch');
    if (bSearch) bSearch.value = '';
    if (eSearch) eSearch.value = '';
}

function setupWatchSearch() {
    const baborInput = document.getElementById('baborPersonnelSearch');
    const estriborInput = document.getElementById('estriborPersonnelSearch');

    if (baborInput) {
        baborInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#baborList tbody tr');
            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                row.style.display = name.includes(term) ? '' : 'none';
            });
        });
    }

    if (estriborInput) {
        estriborInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#estriborList tbody tr');
            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                row.style.display = name.includes(term) ? '' : 'none';
            });
        });
    }
}

function swapPersonnelGuard(personId) {
    const id = Number(personId);
    let person = baborPersonnel.find(p => Number(p.id) === id);

    if (person) {
        // Mover de Babor a Estribor
        baborPersonnel = baborPersonnel.filter(p => Number(p.id) !== id);
        estriborPersonnel.push(person);
    } else {
        person = estriborPersonnel.find(p => Number(p.id) === id);
        if (person) {
            // Mover de Estribor a Babor
            estriborPersonnel = estriborPersonnel.filter(p => Number(p.id) !== id);
            baborPersonnel.push(person);
        }
    }

    if (person) {
        localStorage.setItem('baborPersonnel', JSON.stringify(baborPersonnel));
        localStorage.setItem('estriborPersonnel', JSON.stringify(estriborPersonnel));
        renderWatchDivision();
        showNotification(`${person.grade} ${person.name} movido de guardia.`);
    }
}

function generatePersonnelDistribution() {
    if (personnel.length === 0) {
        showNotification("No hay personal registrado para distribuir.");
        return;
    }

    const shiftsResources = [
        { name: "TURNO 1", time: "0800-1200 / 2000-0000" },
        { name: "TURNO 2", time: "1200-1600 / 0000-0400" },
        { name: "TURNO 3", time: "1600-2000 / 0400-0800" }
    ];

    // 1. Obtener configuración de puestos
    const activeToggles = document.querySelectorAll('.loc-toggle:checked');
    const locationsConfig = [];

    activeToggles.forEach(toggle => {
        const parent = toggle.closest('.toggle-control');
        const quotaInput = parent.querySelector('.loc-quota');
        const scheduleInput = parent.querySelector('.loc-schedule');
        const shiftsInput = parent.querySelector('.loc-shifts');

        const val = toggle.value;
        const numShifts = shiftsInput ? (parseInt(shiftsInput.value) || 3) : 3;
        const quota = quotaInput ? (parseInt(quotaInput.value) || 0) : 0;

        const specializedDistricts = ["HTMC", "DISTRITO SUR", "DISTRITO ESTEROS", "DISTRITO 9 DE OCTUBRE"];
        const manualSchedule = scheduleInput ? scheduleInput.value.trim() : "";

        if (specializedDistricts.includes(val) && shiftsInput && !manualSchedule) {
            // TRATAMOS numShifts COMO EL NÚMERO DE EQUIPOS (TURNOS)
            // Cada equipo tendrá 2 periodos en el día (diurno y nocturno)
            const ranges = calculateShiftRanges(numShifts);
            ranges.forEach((range, idx) => {
                locationsConfig.push({
                    name: `${val} (T${idx + 1})`,
                    quota: quota || 2,
                    customSchedule: range,
                    isBase: false,
                    isDynamic: true
                });
            });
        } else if (specializedDistricts.includes(val) && manualSchedule) {
            // SI HAY HORARIO MANUAL, LO USAMOS COMO SI FUERA UN ÚNICO TURNO PARA ESTE PUESTO
            locationsConfig.push({
                name: val,
                quota: quota || 2,
                customSchedule: manualSchedule,
                isBase: false,
                isDynamic: false
            });
        } else {
            locationsConfig.push({
                name: val,
                quota: quota,
                customSchedule: manualSchedule,
                isBase: !manualSchedule
            });
        }
    });

    function calculateShiftRanges(numTeams) {
        if (numTeams <= 0) return [];
        const numSegments = numTeams * 2;
        const segmentDuration = 24 / numSegments;
        const result = [];
        const operationalStart = 8; // Empezamos a las 08:00 institucional

        for (let i = 0; i < numTeams; i++) {
            // Segmento 1 (Diurno)
            const s1Start = (operationalStart + (i * segmentDuration)) % 24;
            const s1End = (operationalStart + ((i + 1) * segmentDuration)) % 24;

            // Segmento 2 (Nocturno - Desplazado 12h)
            const s2Start = (s1Start + 12) % 24;
            const s2End = (s1End + 12) % 24;

            const formatTime = (h) => {
                const hour = Math.floor(h);
                const min = Math.floor((h - hour) * 60);
                return String(hour).padStart(2, '0') + String(min).padStart(2, '0');
            };

            const range1 = `${formatTime(s1Start)}-${formatTime(s1End)}`;
            const range2 = `${formatTime(s2Start)}-${formatTime(s2End)}`;

            result.push(`${range1} / ${range2}`);
        }
        return result;
    }

    if (locationsConfig.length === 0) {
        showNotification("Debe activar al menos un puesto para la distribución.");
        return;
    }

    // 2. Agrupar personal por jerarquía estricta para reemplazos
    const OFFICERS = ["CPNV", "CPFG", "CPCB", "TNNV", "TNFG", "ALFG"];
    const CREW_HIERARCHY = ["SUBM", "SUBP", "SUBS", "SGOP", "SGOS", "CBOP", "CBOS", "MARO"];

    // 0. Filtrar por grupo seleccionado si existe
    let distributionPool = [...personnel];
    if (selectedWatchGroup) {
        if (baborPersonnel.length === 0 && localStorage.getItem('baborPersonnel')) {
            baborPersonnel = JSON.parse(localStorage.getItem('baborPersonnel'));
            estriborPersonnel = JSON.parse(localStorage.getItem('estriborPersonnel'));
        }
        distributionPool = selectedWatchGroup === 'babor' ? baborPersonnel :
            selectedWatchGroup === 'estribor' ? estriborPersonnel :
                [...baborPersonnel, ...estriborPersonnel];
    }

    // 0.1 CLONAR POOL PARA VALIDACIÓN FINAL
    const initialPoolIds = new Set(distributionPool.map(p => p.id));

    // RE-INICIALIZAR SIEMPRE LOS ARRAYS DE ASIGNACIÓN AL INICIO
    guardAssignments = [];
    specialAssignments = []; // No lo usaremos más para evitar fragmentación, pero lo limpiamos

    // 0.2 Prioridad CORLOJ/CORMAN (Toque de Queda)
    const isPriorityUnit = (p) => {
        if (!p.unit) return false;
        const u = p.unit.toUpperCase();
        return u.includes("CORLOJ") || u.includes("CORMAN");
    };

    const tq23puesto = locationsConfig.find(l => l.name.includes("2300-0200"));
    if (tq23puesto) {
        const priorityCandidates = distributionPool.filter(isPriorityUnit);
        priorityCandidates.forEach(p => {
            guardAssignments.push({
                ...p,
                assignedLocation: tq23puesto.name,
                assignedShift: "CONTROL TOQUE DE QUEDA",
                assignedTime: "2300-0200"
            });
        });
    }

    // El resto del personal para repartir (que no haya sido ya asignado a TQ)
    const assignedIds = new Set(guardAssignments.map(a => a.id));
    const remainingPool = distributionPool.filter(p => !assignedIds.has(p.id));

    const gradeGroups = {};
    remainingPool.forEach(p => {
        const g = p.grade || "S/N";
        if (!gradeGroups[g]) gradeGroups[g] = [];
        gradeGroups[g].push({ ...p });
    });

    const PRIORITY_LOCS = ["9 DE OCTUBRE", "SEGURIDAD PRESIDENCIAL", "SEGURIDAD PRIMERA DAMA", "CPL", "HTMC"];

    // Helper: Obtener el de mayor jerarquía disponible (Oficial > SUBM > MARO)
    const getHighestAvailable = () => {
        const fullHierarchy = [...OFFICERS, ...CREW_HIERARCHY];
        for (const g of fullHierarchy) {
            if (gradeGroups[g] && gradeGroups[g].length > 0) return gradeGroups[g].shift();
        }
        return null;
    };

    // Helper: Obtener un tripulante cualquiera (para cuotas o mix)
    const getAnyCrew = () => {
        for (const g of CREW_HIERARCHY) {
            if (gradeGroups[g] && gradeGroups[g].length > 0) return gradeGroups[g].shift();
        }
        return null;
    };

    // 3. PASO 1: ASIGNAR TAREAS DE APOYO (Misiones Especiales)
    const specialLocs = locationsConfig.filter(l => !l.isBase && l.quota > 0);
    // Ordenar locs especiales para que las prioritarias vayan primero
    specialLocs.sort((a, b) => {
        const aPri = PRIORITY_LOCS.some(p => a.name.toUpperCase().includes(p)) ? 0 : 1;
        const bPri = PRIORITY_LOCS.some(p => b.name.toUpperCase().includes(p)) ? 0 : 1;
        return aPri - bPri;
    });

    specialLocs.forEach(loc => {
        let assignedToLoc = 0;

        // Garantía de Mando: Mayor jerarquía disponible
        const boss = getHighestAvailable();
        if (boss) {
            guardAssignments.push({ ...boss, assignedLocation: loc.name, assignedShift: "TAREA DE APOYO", assignedTime: loc.customSchedule });
            assignedToLoc++;
        }

        // Rellenar resto de cuota (prioridad tripulantes para dispersar mando)
        while (assignedToLoc < loc.quota) {
            const p = getAnyCrew() || getHighestAvailable();
            if (!p) break;
            guardAssignments.push({ ...p, assignedLocation: loc.name, assignedShift: "TAREA DE APOYO", assignedTime: loc.customSchedule });
            assignedToLoc++;
        }
    });

    // 4. PASO 2: REPARTIR EL RESTO EN LOS 3 TURNOS
    // Incluir TODOS los destinos posibles (Base, Dinámicos y Toque de Queda) para el reparto del sobrante
    const autoDestinations = locationsConfig.filter(l => l.isBase || l.isDynamic || l.name.includes("TOQUE DE QUEDA"));

    if (autoDestinations.length > 0) {
        const shiftPools = [[], [], []];
        const fullHierarchy = [...OFFICERS, ...CREW_HIERARCHY];

        fullHierarchy.forEach(g => {
            if (gradeGroups[g]) {
                let tIdx = 0;
                while (gradeGroups[g].length > 0) {
                    shiftPools[tIdx % 3].push(gradeGroups[g].shift());
                    tIdx++;
                }
            }
        });

        for (let t = 0; t < 3; t++) {
            const shift = shiftsResources[t];
            const currentShiftPool = shiftPools[t];

            // Destinos activos en este turno
            const locationsInShift = autoDestinations.map(d => {
                let time = d.customSchedule || shift.time;
                let group = d.isDynamic ? "TAREA DE APOYO" : shift.name;

                if (d.name.includes("2300-0200")) { time = "2300-0200"; group = "CONTROL TOQUE DE QUEDA"; }
                if (d.name.includes("0200-0500")) { time = "0200-0500"; group = "CONTROL TOQUE DE QUEDA"; }

                return { ...d, assignedTime: time, assignedShift: group };
            }).sort((a, b) => {
                const aPri = PRIORITY_LOCS.some(p => a.name.toUpperCase().includes(p)) ? 0 : 1;
                const bPri = PRIORITY_LOCS.some(p => b.name.toUpperCase().includes(p)) ? 0 : 1;
                return aPri - bPri;
            });

            // Helper para este turno: OBTENER SOLO OFICIAL
            const getOnlyOfficialInTurn = () => {
                for (const g of OFFICERS) {
                    const idx = currentShiftPool.findIndex(p => p.grade === g);
                    if (idx !== -1) return currentShiftPool.splice(idx, 1)[0];
                }
                return null;
            };

            // Helper para este turno: OBTENER SOLO TRIPULANTE
            const getOnlyCrewInTurn = () => {
                for (const g of CREW_HIERARCHY) {
                    const idx = currentShiftPool.findIndex(p => p.grade === g);
                    if (idx !== -1) return currentShiftPool.splice(idx, 1)[0];
                }
                return null;
            };

            // A. GARANTÍA DE MANDO: 1 LÍDER (Prioridad Oficial) y 1 APOYO (Prioridad Tropa) por puesto
            locationsInShift.forEach(loc => {
                // El líder es el de mayor jerarquía (Oficial o Tropa alta si no hay oficial)
                const leader = getOnlyOfficialInTurn() || getOnlyCrewInTurn() || (currentShiftPool.length > 0 ? currentShiftPool.shift() : null);
                if (leader) {
                    guardAssignments.push({ ...leader, assignedLocation: loc.name, assignedShift: loc.assignedShift, assignedTime: loc.assignedTime });
                }
                // El apoyo es ESTRICTAMENTE tropa mientras haya disponibles
                const support = getOnlyCrewInTurn() || (currentShiftPool.length > 0 ? currentShiftPool.shift() : null);
                if (support) {
                    guardAssignments.push({ ...support, assignedLocation: loc.name, assignedShift: loc.assignedShift, assignedTime: loc.assignedTime });
                }
            });

            // B. COMPLETAR CUOTAS (ESTRICTAMENTE TRIPULANTES mientras haya)
            locationsInShift.filter(l => l.quota > 0).forEach(loc => {
                const current = guardAssignments.filter(a => a.assignedLocation === loc.name && a.assignedShift === loc.assignedShift).length;
                let needed = loc.quota - current;
                for (let i = 0; i < needed; i++) {
                    const p = getOnlyCrewInTurn() || (currentShiftPool.length > 0 ? currentShiftPool.shift() : null);
                    if (p) guardAssignments.push({ ...p, assignedLocation: loc.name, assignedShift: loc.assignedShift, assignedTime: loc.assignedTime });
                }
            });

            // C. SOBRANTE AUTOMÁTICO (Repartir lo que quede de forma EQUITATIVA)
            // Para que sea equitativo (especialmente con CORLOJ/CORMAN), buscamos siempre el puesto con menos gente
            while (currentShiftPool.length > 0) {
                const p = getOnlyCrewInTurn() || currentShiftPool.shift();
                const locWithLeast = locationsInShift.reduce((prev, curr) => {
                    const countPrev = guardAssignments.filter(a => a.assignedLocation === prev.name && a.assignedShift === prev.assignedShift).length;
                    const countCurr = guardAssignments.filter(a => a.assignedLocation === curr.name && a.assignedShift === curr.assignedShift).length;
                    return (countCurr < countPrev) ? curr : prev;
                });
                guardAssignments.push({ ...p, assignedLocation: locWithLeast.name, assignedShift: locWithLeast.assignedShift, assignedTime: locWithLeast.assignedTime });
            }
        }
    }

    // 6. COBERTURA TOTAL (Garantizar 100% de distribución real)
    Object.keys(gradeGroups).forEach(g => {
        while (gradeGroups[g].length > 0) {
            const p = gradeGroups[g].shift();
            const allPossibleLocs = locationsConfig.map(l => {
                const time = l.customSchedule || "0800-1200 / 2000-0000";
                const shiftName = l.isDynamic ? "TAREA DE APOYO" : "TURNO 1";
                return { ...l, assignedTime: time, assignedShift: shiftName };
            });

            const locWithLeast = allPossibleLocs.reduce((prev, curr) => {
                const countPrev = guardAssignments.filter(a => a.assignedLocation === prev.name).length;
                const countCurr = guardAssignments.filter(a => a.assignedLocation === curr.name).length;
                return (countCurr < countPrev) ? curr : prev;
            });
            guardAssignments.push({ ...p, assignedLocation: locWithLeast.name, assignedShift: locWithLeast.assignedShift, assignedTime: locWithLeast.assignedTime });
        }
    });

    // 7. VERIFICACIÓN FINAL ANTI-PÉRDIDAS: Comparar IDs
    const finalAssignedIds = new Set(guardAssignments.map(a => a.id));
    distributionPool.forEach(p => {
        if (!finalAssignedIds.has(p.id)) {
            const locWithLeast = locationsConfig.map(l => ({
                ...l,
                assignedTime: l.customSchedule || "0800-1200 / 2000-0000",
                assignedShift: l.isDynamic ? "TAREA DE APOYO" : "TURNO 1"
            })).reduce((prev, curr) => {
                const countPrev = guardAssignments.filter(a => a.assignedLocation === prev.name).length;
                const countCurr = guardAssignments.filter(a => a.assignedLocation === curr.name).length;
                return (countCurr < countPrev) ? curr : prev;
            });
            guardAssignments.push({ ...p, assignedLocation: locWithLeast.name, assignedShift: locWithLeast.assignedShift, assignedTime: locWithLeast.assignedTime });
        }
    });

    showNotification(`Distribución completada: ${guardAssignments.length} de ${distributionPool.length} distribuidos.`);

    renderDistributionTable();
}

function renderDistributionTable() {
    const tableBody = document.getElementById("distributionTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    // Agrupar TODAS las asignaciones por LOCALIZACIÓN (ya no usamos arrays separados)
    const grouped = {};
    guardAssignments.forEach(a => {
        const loc = a.assignedLocation || "SIN PUESTO";
        if (!grouped[loc]) grouped[loc] = [];
        grouped[loc].push(a);
    });

    const sortedLocations = Object.keys(grouped).sort();

    sortedLocations.forEach(locName => {
        const assignments = grouped[locName];

        // Header de Localización para la tabla principal
        const headerRow = document.createElement("tr");
        headerRow.classList.add("shift-header");
        headerRow.style.background = "rgba(239, 68, 68, 0.15)";
        headerRow.innerHTML = `
            <td colspan="7" style="color: #ef4444; font-weight: bold; padding: 12px; border-left: 5px solid #ef4444;">
                ${locName.toUpperCase()}
            </td>
            <td style="text-align: right; color: #94a3b8; font-size: 0.85em; vertical-align: middle; padding-right: 15px;">
                TOTAL: ${assignments.length} PERS.
            </td>
        `;
        tableBody.appendChild(headerRow);

        // Agrupar por Horario dentro de la localización para claridad
        const timeGroups = {};
        assignments.forEach(a => {
            const t = a.assignedTime || "SIN HORARIO";
            if (!timeGroups[t]) timeGroups[t] = [];
            timeGroups[t].push(a);
        });

        Object.keys(timeGroups).forEach(time => {
            const timeMembers = timeGroups[time];

            // Sub-header de Horario
            const subHeader = document.createElement("tr");
            subHeader.innerHTML = `<td colspan="8" style="background: rgba(255,255,255,0.03); color: #60a5fa; font-size: 0.8em; padding: 5px 20px; font-weight: 500;">BLOQUE HORARIO: ${time}</td>`;
            tableBody.appendChild(subHeader);

            timeMembers.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td style="text-align: center;">${item.grade}</td>
                    <td style="text-align: center;">${item.specialty || "N/A"}</td>
                    <td>${item.name}</td>
                    <td style="text-align: center;">${item.idNum || item.id || "S/N"}</td>
                    <td style="text-align: center;">${item.unit || "S/N"}</td>
                    <td style="text-align: center; color: #94a3b8; font-size: 0.85em;">${item.assignedShift || "GUARDIA"}</td>
                    <td style="text-align: center;">${item.contact || "S/N"}</td>
                    <td style="text-align: center;">
                        <button class="btn-action edit" title="Mover Personal" onclick="openEditDistributionModal('${item.id}')" 
                            style="padding: 4px 10px; font-size: 0.75rem; display: flex; align-items: center; gap: 5px; margin: 0 auto; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8; border-radius: 4px; cursor: pointer;">
                            <span>🔄</span>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
    });

    saveData();
    updatePersonnelStats();
}

function openEditDistributionModal(personId) {
    const allAssignments = [...specialAssignments, ...guardAssignments];
    const person = allAssignments.find(a => String(a.id) === String(personId));
    if (!person) return;

    document.getElementById('editDistId').value = person.id;
    document.getElementById('editDistName').textContent = `${person.grade} ${person.name}`;
    document.getElementById('editDistShift').value = person.assignedShift || "TURNO 1";
    document.getElementById('editDistTime').value = person.assignedTime || "";

    // Poblar puestos dinámicamente: usamos todos los que ya existen en la distribución actual
    const locSelect = document.getElementById('editDistLocation');
    locSelect.innerHTML = '';

    // Obtener lista única de puestos que ya tienen gente asignada
    const currentLocs = [...new Set(allAssignments.map(a => a.assignedLocation))].sort();

    // Y añadir también los puestos base que estén activos por si acaso alguno está vacío
    const activeToggles = Array.from(document.querySelectorAll('.loc-toggle:checked')).map(t => t.value);
    const allLocs = [...new Set([...currentLocs, ...activeToggles])].sort();

    allLocs.forEach(loc => {
        if (!loc) return;
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        locSelect.appendChild(option);
    });

    locSelect.value = person.assignedLocation;

    document.getElementById('editDistModal').style.display = 'block';
}

function handleManualAssignmentSave(e) {
    e.preventDefault();
    const id = document.getElementById('editDistId').value;
    const newLoc = document.getElementById('editDistLocation').value;
    const newShift = document.getElementById('editDistShift').value;
    const newTime = document.getElementById('editDistTime').value;

    // Buscar en ambos arrays
    let assignment = specialAssignments.find(a => String(a.id) === String(id));
    let sourceArray = specialAssignments;

    if (!assignment) {
        assignment = guardAssignments.find(a => String(a.id) === String(id));
        sourceArray = guardAssignments;
    }

    if (assignment) {
        // Si el turno cambia de "TAREA DE APOYO" a algo más o viceversa, mover entre arrays
        const oldShift = assignment.assignedShift;
        assignment.assignedLocation = newLoc;
        assignment.assignedShift = newShift;
        assignment.assignedTime = newTime;

        if (oldShift === "TAREA DE APOYO" && newShift !== "TAREA DE APOYO") {
            // Mover de special assignments a guard assignments
            specialAssignments = specialAssignments.filter(a => String(a.id) !== String(id));
            guardAssignments.push(assignment);
        } else if (oldShift !== "TAREA DE APOYO" && newShift === "TAREA DE APOYO") {
            // Mover de guard assignments a special assignments
            guardAssignments = guardAssignments.filter(a => String(a.id) !== String(id));
            specialAssignments.push(assignment);
        }

        renderDistributionTable();
        document.getElementById('editDistModal').style.display = 'none';
        showNotification("Asignación actualizada manualmente");
    }
}
function activateNewDay() {
    const confirmMsg = `¿ESTÁ SEGURO DE INICIAR UNA NUEVA OPERACIÓN?\n\nEsta acción:\n1. Reiniciará la lista de división de guardias (Babor/Estribor).\n2. Limpiará la tabla de distribución de personal.\n3. Limpiará la planificación operativa de esta misión.\n\n* El historial de inteligencia (MAPA DE CALOR) y los Partes al Instante SE MANTENDRÁN intactos.`;

    if (confirm(confirmMsg)) {
        const name = prompt("Ingrese el nombre de la NUEVA OPERACIÓN (Ej: TORMENTA, ESCUDO):", "");

        if (name) {
            operationName = name.toUpperCase();

            // Reiniciar datos operacionales específicos de la misión
            guardAssignments = [];
            specialAssignments = [];
            opsEvents = [];
            baborPersonnel = [];
            estriborPersonnel = [];
            selectedWatchGroup = null;

            // Limpiar localStorage de estos datos específicos
            localStorage.removeItem('baborPersonnel');
            localStorage.removeItem('estriborPersonnel');
            localStorage.removeItem('selectedWatchGroup');

            // Guardar nueva misión y resetear los demás
            localStorage.setItem('operationName', operationName);
            saveData();

            // Actualizar UI
            updateUI();
            updatePersonnelStats();
            renderPersonnelTable();
            renderOpsPlanningTable();
            if (typeof renderWatchDivision === 'function') renderWatchDivision();
            if (typeof renderDistributionTable === 'function') renderDistributionTable();

            // Notificar y mover a vista de personal
            showNotification(`Operación ${operationName} activada con éxito.`);
            const personalBtn = document.querySelector('.menu-btn[data-target="personal"]');
            if (personalBtn) personalBtn.click();
        }
    }
}

function renderHistoricalPatrolTable() {
    const tableBody = document.getElementById('historicalPatrolBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    patrolOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 700; color: white;">${order.num}</td>
            <td>${order.unit}</td>
            <td>${order.creation}</td>
            <td>${order.close}</td>
            <td><span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">${order.status}</span></td>
            <td class="table-actions">
                <button class="btn-action edit" title="Ver Detalles">👁️</button>
                <button class="btn-action delete" title="Generar Informe">📄</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// --- LÓGICA DE VEHÍCULOS (LOGÍSTICA) ---

function handleVehicleSubmit(e) {
    e.preventDefault();
    const plate = document.getElementById('vPlate').value.toUpperCase();
    const type = document.getElementById('vType').value;
    const brand = document.getElementById('vBrand').value;
    const km = parseFloat(document.getElementById('vKM').value);
    const lastMaint = parseFloat(document.getElementById('vLastMaintKM').value);

    // Validar si ya existe (para editar o evitar duplicados)
    const existingIndex = vehicles.findIndex(v => v.plate === plate);

    const submitBtn = document.getElementById('submitVehicleBtn');
    const isEditing = submitBtn.dataset.mode === 'edit';

    if (existingIndex !== -1) {
        // Si estamos en modo edición o el usuario confirma, actualizamos
        if (isEditing || confirm(`El vehículo con placa ${plate} ya existe. ¿Deseas actualizar sus datos?`)) {
            const available = document.getElementById('vAvailable').checked;
            vehicles[existingIndex] = { ...vehicles[existingIndex], type, brand, km, lastMaint, available };
            showNotification(`Vehículo ${plate} actualizado.`);
        } else return;
    } else {
        const available = document.getElementById('vAvailable').checked;
        vehicles.push({
            id: Date.now(),
            plate,
            type,
            brand,
            km,
            lastMaint,
            available,
            history: [] // Para futuro tracking de rutas
        });
        showNotification(`Vehículo ${plate} registrado con éxito.`);
    }

    saveData();
    renderVehiclesTable();
    e.target.reset();

    // Restaurar el botón a su estado original
    submitBtn.textContent = 'Registrar Vehículo';
    submitBtn.style.backgroundColor = '';
    submitBtn.dataset.mode = 'add';
}

function toggleVehicleAvailability(plate) {
    const v = vehicles.find(veh => veh.plate === plate);
    if (v) {
        v.available = !v.available;
        saveData();
        renderVehiclesTable();
        showNotification(`Estado de ${plate} actualizado.`);
    }
}

function editVehicle(plate) {
    const v = vehicles.find(veh => veh.plate === plate);
    if (!v) return;

    // Poblar el formulario
    document.getElementById('vPlate').value = v.plate;
    document.getElementById('vType').value = v.type;
    document.getElementById('vBrand').value = v.brand;
    document.getElementById('vKM').value = v.km;
    document.getElementById('vLastMaintKM').value = v.lastMaint;
    document.getElementById('vAvailable').checked = v.available;

    // Cambiar texto del botón para indicar edición
    const submitBtn = document.getElementById('submitVehicleBtn');
    submitBtn.textContent = 'Actualizar Datos del Vehículo';
    submitBtn.style.backgroundColor = '#f59e0b'; // Color naranja para distinguir
    submitBtn.dataset.mode = 'edit';

    // Hacer scroll al formulario
    document.querySelector('.personnel-form-block').scrollIntoView({ behavior: 'smooth' });
}

function renderVehiclesTable() {
    const tbody = document.getElementById('tableBodyVehicles');
    if (!tbody) return;
    tbody.innerHTML = '';

    vehicles.forEach(v => {
        const recorrido = v.km - v.lastMaint;
        let statusClass = 'status-ok';
        let statusText = 'Mantenimiento al día';

        if (recorrido >= 5000) {
            statusClass = 'status-danger';
            statusText = 'MANTENIMIENTO REQUERIDO';
        } else if (recorrido >= 4000) {
            statusClass = 'status-warning';
            statusText = 'Próximo mantenimiento';
        }

        const availClass = v.available ? 'status-ok' : 'status-danger';
        const availText = v.available ? 'DISPONIBLE' : 'NO DISPONIBLE';

        const row = document.createElement('tr');
        if (statusClass === 'status-danger') {
            row.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        }

        row.innerHTML = `
            <td style="font-weight: 700;">${v.plate}</td>
            <td>${v.type}</td>
            <td>${v.brand}</td>
            <td>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <input type="checkbox" ${v.available ? 'checked' : ''} onchange="toggleVehicleAvailability('${v.plate}')" style="width: 18px; height: 18px; cursor: pointer;">
                    <span class="status-pill ${availClass}" style="min-width: 70px; font-size: 0.6rem;">${availText}</span>
                </div>
            </td>
            <td class="km-value">${v.km.toLocaleString()} KM</td>
            <td class="km-value">${v.lastMaint.toLocaleString()} KM</td>
            <td class="recorrido-value">${recorrido.toLocaleString()} KM</td>
            <td><span class="status-pill ${statusClass}">${statusText}</span></td>
            <td class="table-actions">
                <button class="btn-action edit" onclick="editVehicle('${v.plate}')" title="Modificar Datos Vehículo">✏️</button>
                <button class="btn-action edit" onclick="updateVehicleMileage('${v.plate}')" title="Actualizar Kilometraje">📈</button>
                <button class="btn-maint" onclick="recordVehicleMaintenance('${v.plate}')" title="Registrar Mantenimiento Realizado">🛠️</button>
                <button class="btn-action delete" onclick="deleteVehicle('${v.plate}')" title="Eliminar Vehículo">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateVehicleMileage(plate) {
    const v = vehicles.find(veh => veh.plate === plate);
    if (!v) return;

    const newKM = prompt(`Ingrese el nuevo kilometraje para ${plate} (KM actual: ${v.km}):`, v.km);
    if (newKM !== null && !isNaN(newKM)) {
        const parsedKM = parseFloat(newKM);
        if (parsedKM < v.km) {
            alert('El nuevo kilometraje no puede ser menor al actual.');
            return;
        }
        v.km = parsedKM;
        saveData();
        renderVehiclesTable();
        showNotification(`Kilometraje de ${plate} actualizado.`);
    }
}

function recordVehicleMaintenance(plate) {
    const v = vehicles.find(veh => veh.plate === plate);
    if (!v) return;

    if (confirm(`¿Confirma que se ha realizado el mantenimiento de los 5000 KM para el vehículo ${plate}?\nSe reseteará el kilometraje de referencia a ${v.km} KM.`)) {
        v.lastMaint = v.km;
        saveData();
        renderVehiclesTable();
        showNotification(`Mantenimiento registrado para ${plate}. Próximo a los ${(v.km + 5000).toLocaleString()} KM.`);
    }
}

function deleteVehicle(plate) {
    if (confirm(`¿Está seguro de eliminar el vehículo ${plate}?`)) {
        vehicles = vehicles.filter(v => v.plate !== plate);
        saveData();
        renderVehiclesTable();
        showNotification(`Vehículo ${plate} eliminado.`);
    }
}

function exportVehiclesToExcel() {
    if (vehicles.length === 0) {
        showNotification("No hay vehículos para exportar.");
        return;
    }

    let csv = "Placa,Tipo,Marca/Modelo,Kilometraje Actual,Ultimo Mantenimiento,Recorrido desde Maint,Estado\n";
    vehicles.forEach(v => {
        const recorrido = v.km - v.lastMaint;
        let status = "OK";
        if (recorrido >= 5000) status = "MANTENIMIENTO REQUERIDO";
        else if (recorrido >= 4000) status = "PREVENTIVO";

        csv += `"${v.plate}","${v.type}","${v.brand}",${v.km},${v.lastMaint},${recorrido},"${status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inventario_vehiculos_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- LÓGICA DE CARGA KMZ ---
function handleKMZUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Loading KMZ:", file.name);
    showNotification(`Cargando archivo: ${file.name}...`);

    // Crear la capa KMZ
    const kmz = L.kmzLayer().addTo(map);

    kmz.on('load', function (e) {
        kmzControl.addOverlay(e.layer, e.name);
        map.fitBounds(e.layer.getBounds());
        showNotification(`KMZ "${e.name}" cargado con éxito.`);
    });

    kmz.load(file);

    // Reset input
    e.target.value = '';
}

// --- LÓGICA DE IMPORTACIÓN EXCEL DE PERSONAL ---
function handlePersonnelExcelImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
        try {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);

            if (json.length === 0) {
                showNotification("El archivo Excel está vacío.");
                return;
            }

            console.log("Importing personnel from Excel:", json.length);

            let addedCount = 0;
            json.forEach(row => {
                // Mapeo flexible de columnas (Sensible al nombre de cabeceras comunes)
                const grade = row.GRADO || row.Grado || row.grade || "MARO";
                const specialty = row.ESPECIALIDAD || row.Especialidad || row.specialty || "IM";
                const name = row.NOMBRES || row.Nombre || row.name || "S/N";
                const idNum = String(row.CEDULA || row.Cedula || row.id || "0000000000").padStart(10, '0');
                const condition = row.CONDICION || row.Condicion || "OPERATIVO";
                const unit = row.UNIDAD || row.Unidad || row.unit || "GYE";
                const contact = row.CONTACTO || row.Contacto || row.contact || "";

                // Evitar duplicados por Cédula
                if (!personnel.some(p => p.idNum === idNum)) {
                    personnel.push({
                        id: Date.now() + addedCount,
                        grade,
                        specialty,
                        name,
                        idNum,
                        condition,
                        unit,
                        contact
                    });
                    addedCount++;
                }
            });

            saveData();
            renderPersonnelTable();
            updatePersonnelStats();
            showNotification(`Se han importado ${addedCount} registros nuevos.`);
        } catch (err) {
            console.error("Error parsing Excel:", err);
            showNotification("Error al procesar el archivo Excel.");
        }
    };

    reader.readAsBinaryString(file);

    // Reset input
    e.target.value = '';
}

// --- LÓGICA DE ÓRDENES DE PATRULLA (ORDPAT-GT 100.51) ---

function handleORDPATSubmit(e) {
    e.preventDefault();

    // Recolectar tareas de la tabla
    const tareas = [];
    document.querySelectorAll('#opTareasBody tr').forEach(row => {
        const patrulla = row.querySelector('.row-patrulla').value;
        const lugar = row.querySelector('.row-lugar').value;
        if (patrulla || lugar) {
            tareas.push({
                patrulla,
                lugar,
                nominativos: row.querySelector('.row-nominativo').value,
                hora: row.querySelector('.row-hora').value,
                personal: row.querySelector('.row-personal').value
            });
        }
    });

    const snapshot = getPersonnelSnapshot(null, null); // For ORDPAT, we might capture more or specific ones, but for now we capture current assignments

    const newORDPAT = {
        id: 'ordpat_' + Date.now(),
        personnelSnapshot: snapshot, // DÍAS DE OPERACION TRACKING
        fh: document.getElementById('opFH').value,
        msj: document.getElementById('opMSJ').value,
        nro: document.getElementById('opNroOrden').value,
        refId: document.getElementById('opID').value,
        referencias: (() => {
            const refs = [];
            document.querySelectorAll('#opRefsBody tr').forEach((row, idx) => {
                const text = row.querySelector('.row-ref-text').value;
                if (text) {
                    refs.push({
                        label: String.fromCharCode(97 + idx) + ')',
                        text: text
                    });
                }
            });
            return refs;
        })(),
        huso: document.getElementById('opHuso').value,
        situacionMain: document.getElementById('opSituacionMain').value,
        amenaza: document.getElementById('opSituacionAmenaza').value,
        situacionOrgHeader: document.getElementById('opSituacionOrgHeader').value,
        organizacion: (() => {
            const orgRows = [];
            document.querySelectorAll('#opOrgBody tr').forEach(row => {
                const unidad = row.querySelector('.row-org-unidad').value;
                if (unidad) {
                    orgRows.push({
                        unidad,
                        oficiales: row.querySelector('.row-org-oficiales').value,
                        tripulantes: row.querySelector('.row-org-tripulantes').value
                    });
                }
            });
            return orgRows;
        })(),
        mision: document.getElementById('opMision').value,
        concepto: document.getElementById('opConcepto').value,
        tareas: tareas,
        tareasExtras: document.getElementById('opTareasExtras').value,
        coordinacion: document.getElementById('opCoordinacion').value,
        logistica: document.getElementById('opLogistica').value,
        mando: document.getElementById('opMando').value,
        mandoControl: document.getElementById('opMandoControl').value,
        recibo: document.getElementById('opRecibo').value,
        etNombre: document.getElementById('opETNombre').value || '',
        etCargo: document.getElementById('opETCargo').value || '',
        firmanteNombre: document.getElementById('opFirmanteNombre').value,
        firmanteGrado: document.getElementById('opFirmanteGrado').value,
        firmanteCargo: document.getElementById('opFirmanteCargo').value,
        firmanteSecundario: document.getElementById('opFirmanteSecundario').value,
        sumilla: document.getElementById('opSumilla').value,
        timestamp: new Date().toISOString()
    };

    patrolOrders.push(newORDPAT);
    saveData();
    renderORDPATTable();
    e.target.reset();
    document.getElementById('opTareasBody').innerHTML = ''; // Limpiar tablas dinámicas
    document.getElementById('opOrgBody').innerHTML = '';
    document.getElementById('opRefsBody').innerHTML = `
        <tr>
            <td style="border: 1px solid var(--border); padding: 5px; width: 30px; text-align: center; color: var(--text-muted); font-family: monospace;">a)</td>
            <td style="border: 1px solid var(--border); padding: 0;">
                <input type="text" class="row-ref-text" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;">
            </td>
            <td style="border: 1px solid var(--border); padding: 5px; text-align: center; width: 50px;">
                <button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button>
            </td>
        </tr>
    `;
    showNotification(`Orden de Patrulla ${newORDPAT.nro} guardada con éxito`);

    // Mostrar el PDF inmediatamente
    generateORDPATPDF(newORDPAT.id);

    // Auto-preparar la siguiente orden con los mismos datos base
    setTimeout(() => prefillORDPATFormWithLast(), 500);
}

function prefillORDPATFormWithLast() {
    if (patrolOrders.length === 0) return;
    const last = patrolOrders[patrolOrders.length - 1];

    // Campos básicos
    const fields = {
        'opFH': last.fh,
        'opMSJ': last.msj,
        'opNroOrden': last.nro,
        'opID': last.refId,
        'opHuso': last.huso,
        'opSituacionMain': last.situacionMain,
        'opSituacionAmenaza': last.amenaza,
        'opSituacionOrgHeader': last.situacionOrgHeader,
        'opMision': last.mision,
        'opConcepto': last.concepto,
        'opTareasExtras': last.tareasExtras,
        'opCoordinacion': last.coordinacion,
        'opLogistica': last.logistica,
        'opMando': last.mando,
        'opMandoControl': last.mandoControl,
        'opRecibo': last.recibo,
        'opETNombre': last.etNombre,
        'opETCargo': last.etCargo,
        'opFirmanteNombre': last.firmanteNombre,
        'opFirmanteGrado': last.firmanteGrado,
        'opFirmanteCargo': last.firmanteCargo,
        'opFirmanteSecundario': last.firmanteSecundario,
        'opSumilla': last.sumilla
    };

    for (const [id, value] of Object.entries(fields)) {
        const el = document.getElementById(id);
        if (el) {
            el.value = value || '';
            // Disparar evento input para actualizar los displays del header
            el.dispatchEvent(new Event('input'));
        }
    }

    // Tablas dinámicas: Referencias
    const refsBody = document.getElementById('opRefsBody');
    if (refsBody && last.referencias) {
        refsBody.innerHTML = '';
        last.referencias.forEach((ref, idx) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 5px; width: 30px; text-align: center; color: var(--text-muted); font-family: monospace;">${ref.label}</td>
                <td style="border: 1px solid var(--border); padding: 0;">
                    <input type="text" class="row-ref-text" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${ref.text}">
                </td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center; width: 50px;">
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button>
                </td>
            `;
            refsBody.appendChild(row);
        });
    }

    // Organización
    const orgBody = document.getElementById('opOrgBody');
    if (orgBody && last.organizacion) {
        orgBody.innerHTML = '';
        last.organizacion.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-org-unidad" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${item.unidad}"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-org-oficiales" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${item.oficiales}"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-org-tripulantes" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${item.tripulantes}"></td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center;"><button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button></td>
            `;
            orgBody.appendChild(row);
        });
    }

    // Tareas
    const tareasBody = document.getElementById('opTareasBody');
    if (tareasBody && last.tareas) {
        tareasBody.innerHTML = '';
        last.tareas.forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-patrulla" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${t.patrulla}"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-lugar" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${t.lugar}"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-nominativo" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${t.nominativos}"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-hora" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${t.hora}"></td>
                <td style="border: 1px solid var(--border); padding: 0;"><input type="text" class="row-personal" style="width: 100%; background: transparent; border: none; color: white; padding: 8px;" value="${t.personal}"></td>
                <td style="border: 1px solid var(--border); padding: 5px; text-align: center;"><button type="button" class="btn-remove-row" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">×</button></td>
            `;
            tareasBody.appendChild(row);
        });
    }
    console.log("Formulario ORDPAT pre-llenado con éxito.");
}

function renderORDPATTable() {
    const tableBody = document.getElementById('tableBodyORDPAT');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const sorted = [...patrolOrders].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sorted.forEach(op => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 700; color: white;">${op.refId}</td>
            <td>${op.fh}</td>
            <td style="text-align: center;">${op.nro}</td>
            <td>${op.firmanteNombre}</td>
            <td class="table-actions">
                <button class="btn-action edit" data-id="${op.id}" title="Generar PDF Oficial">📄</button>
                <button class="btn-action delete" data-id="${op.id}" title="Eliminar">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteORDPAT(id) {
    console.log("Attempting to delete ORDPAT:", id);
    if (confirm('¿Eliminar esta Orden de Patrulla?')) {
        patrolOrders = patrolOrders.filter(op => op.id !== id);
        saveData();
        renderORDPATTable();
        showNotification('Orden de Patrulla eliminada');
    }
}

// --- DÍAS DE OPERACIÓN & REPORTES ---

// --- HELPER: NORMALIZACIÓN DE TEXTO PARA BÚSQUEDA ROBUSTA ---
function normalizeOpText(text) {
    if (!text) return "";
    return text.toString().toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .replace(/\s+/g, ' ') // Colapsar espacios
        .trim();
}

function getPersonnelSnapshot(puesto, turno) {
    const rawAll = [...(specialAssignments || []), ...(guardAssignments || [])];
    if (rawAll.length === 0) return [];

    const searchPostNorm = normalizeOpText(puesto);
    const searchShiftNorm = normalizeOpText(turno);

    // Identificar el Número de Turno Buscado (1, 2 o 3)
    const searchTurnMatch = searchShiftNorm.match(/(?:T|TURNO|^|\s)([123])(?:\s|$|\))/i);
    const searchTurnNum = searchTurnMatch ? searchTurnMatch[1] : null;

    const results = rawAll.filter(a => {
        const locNorm = normalizeOpText(a.assignedLocation);
        const shiftNorm = normalizeOpText(a.assignedShift);

        // 1. Validar Puesto (Ubicación)
        // El puesto debe coincidir de alguna manera (SUR en DISTRITO SUR, etc.)
        if (searchPostNorm) {
            const matchPuesto = locNorm.includes(searchPostNorm) || searchPostNorm.includes(locNorm);
            if (!matchPuesto) return false;
        }

        // 2. Validar Turno (EXCLUSIVIDAD TOTAL REQUERIDA POR EL USUARIO)
        if (!searchShiftNorm) return true;

        // Si el personal es de "TODOS LOS TURNOS", se incluye siempre que coincida el puesto
        if (shiftNorm.includes("TODOS") || shiftNorm.includes("DIARIO")) {
            return true;
        }

        // Si tenemos un número de turno en la búsqueda (1, 2 o 3)
        // Ejemplo: Buscamos "TURNO 1", encontramos "T1" o "TURNO 1" o "1".
        if (searchTurnNum) {
            const shipTurnMatch = shiftNorm.match(/(?:T|TURNO|^|\s)([123])(?:\s|$|\))/i);
            const shipTurnNum = shipTurnMatch ? shipTurnMatch[1] : null;

            if (shipTurnNum) {
                // Si la persona tiene un número de turno asignado, DEBE SER IGUAL al buscado.
                // Esto evita que TURNO 2 aparezca si buscamos TURNO 1.
                return shipTurnNum === searchTurnNum;
            }
        }

        // Fallback: Si no hay números detectados, usamos coincidencia de texto
        return shiftNorm.includes(searchShiftNorm) || searchShiftNorm.includes(shiftNorm);
    });

    return results.map(p => ({
        id: p.id,
        idNum: p.idNum,
        name: p.name,
        grade: p.grade,
        specialty: p.specialty,
        assignedLocation: p.assignedLocation,
        assignedShift: p.assignedShift,
        assignedTime: p.assignedTime
    }));
}

function renderOperationalReportsView() {
    // Just ensure the year is populated if needed, and clear table if empty
    const body = document.getElementById('operationalReportBody');
    if (body && body.rows.length === 1 && body.rows[0].cells.length === 1) {
        // Keep placeholder
    }
}

function generateOperationalReport() {
    const year = document.getElementById('reportYear').value;
    const period = document.getElementById('reportPeriod').value;
    const body = document.getElementById('operationalReportBody');

    if (!body) return;

    body.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">Procesando registros...</td></tr>';

    setTimeout(() => {
        const reportData = calculateOperationalDays(year, period);
        renderOperationalReportTable(reportData);
    }, 100);
}

function calculateOperationalDays(year, period) {
    // Unir registros históricos que tengan snapshots
    const allRecords = [
        ...patrolOrders.map(o => ({ ...o, type: 'ORDPAT' })),
    ];

    // Filtrar por fecha
    const filteredRecords = allRecords.filter(rec => {
        if (!rec.timestamp) return false;
        const date = new Date(rec.timestamp);
        if (date.getFullYear().toString() !== year) return false;

        const month = date.getMonth() + 1; // 1-12

        if (period.startsWith('m')) {
            const targetMonth = parseInt(period.substring(1));
            return month === targetMonth;
        } else if (period === 's1') {
            return month >= 1 && month <= 6;
        } else if (period === 's2') {
            return month >= 7 && month <= 12;
        } else if (period === 'year') {
            return true;
        }
        return false;
    });

    // Mapeo: Cedula -> { data, count, orders: [] }
    const personMap = new Map();

    filteredRecords.forEach(rec => {
        const snapshot = rec.personnelSnapshot || [];
        // Evitar contar múltiples veces a la misma persona en la misma ORDEN si el snapshot lo tuviera duplicado (raro pero posible)
        const seenInThisOrder = new Set();

        snapshot.forEach(p => {
            if (!p.idNum || seenInThisOrder.has(p.idNum)) return;
            seenInThisOrder.add(p.idNum);

            if (!personMap.has(p.idNum)) {
                personMap.set(p.idNum, {
                    grade: p.grade,
                    name: p.name,
                    specialty: p.specialty,
                    idNum: p.idNum,
                    days: 0,
                    orders: []
                });
            }

            const entry = personMap.get(p.idNum);
            entry.days += 1;
            entry.orders.push(`${rec.type} ${rec.numero || rec.nro || ''}`);
        });
    });

    return Array.from(personMap.values()).sort((a, b) => b.days - a.days);
}

function renderOperationalReportTable(data) {
    const body = document.getElementById('operationalReportBody');
    if (!body) return;

    body.innerHTML = '';

    if (data.length === 0) {
        body.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">No se encontraron registros para el periodo seleccionado.</td></tr>';
        return;
    }

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.grade}</td>
            <td style="font-weight: 600; color: white;">${row.name}</td>
            <td>${row.specialty}</td>
            <td>${row.idNum}</td>
            <td style="text-align: center; font-weight: bold; color: var(--accent-primary); font-size: 1.1rem;">${row.days}</td>
            <td style="font-size: 0.7rem; color: var(--text-muted); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${row.orders.join(', ')}">
                ${row.orders.join(', ')}
            </td>
        `;
        body.appendChild(tr);
    });
}

function exportOperationalReportToExcel() {
    const year = document.getElementById('reportYear').value;
    const period = document.getElementById('reportPeriod').value;
    const data = calculateOperationalDays(year, period);

    if (data.length === 0) {
        showNotification("No hay datos para exportar.");
        return;
    }

    const wsData = [
        ["REPORTE DE DÍAS DE OPERACIÓN"],
        ["Periodo:", `${period} / ${year}`],
        ["Generado:", new Date().toLocaleString()],
        [],
        ["Grado", "Nombres y Apellidos", "Especialidad", "Cédula", "Días de Operación", "Órdenes"]
    ];

    data.forEach(row => {
        wsData.push([row.grade, row.name, row.specialty, row.idNum, row.days, row.orders.join(", ")]);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Reporte Operacional");
    XLSX.writeFile(wb, `Reporte_Operational_${period}_${year}.xlsx`);
}

function exportOperationalReportToPDF() {
    const year = document.getElementById('reportYear').value;
    const period = document.getElementById('reportPeriod').value;
    const data = calculateOperationalDays(year, period);

    if (data.length === 0) {
        showNotification("No hay datos para exportar.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // Encabezado
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text("ARMADA DEL ECUADOR", 105, 15, { align: 'center' });
    doc.text("GRUPO DE TAREA 100.51", 105, 20, { align: 'center' });
    doc.text("REPORTE DE DÍAS DE OPERACIÓN PERSONAL", 105, 30, { align: 'center' });

    doc.setFontSize(9);
    doc.text(`Periodo: ${period.toUpperCase()} / ${year}`, 20, 40);
    doc.text(`Fecha de Impresión: ${new Date().toLocaleDateString()}`, 20, 45);

    const tableHeaders = [["GRADO", "NOMBRES Y APELLIDOS", "ID", "DÍAS OP"]];
    const tableRows = data.map(r => [r.grade, r.name, r.idNum, r.days]);

    doc.autoTable({
        startY: 50,
        head: tableHeaders,
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
        styles: { fontSize: 8 },
        margin: { left: 20, right: 20 }
    });

    doc.save(`Reporte_Operacional_${period}_${year}.pdf`);
}

// --- VISOR DE ÓRDENES EXTERNAS (LOAD ORDERS) ---

async function handleExternalOrderUpload(e) {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        showNotification("Por favor seleccione un archivo PDF válido.", "error");
        return;
    }

    showNotification("Procesando archivo...");
    const id = 'ext_' + Date.now();
    const metadata = {
        id: id,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now()
    };

    try {
        await saveOrderToDB(id, file);
        externalOrdersMetadata.push(metadata);
        localStorage.setItem('externalOrdersMetadata', JSON.stringify(externalOrdersMetadata));

        renderLoadOrdersView();
        showNotification("Orden cargada exitosamente al repositorio.");
    } catch (err) {
        console.error("Upload Fail:", err);
        showNotification("Error al guardar el archivo.", "error");
    }

    e.target.value = ''; // Reset input
}

function renderLoadOrdersView(searchTerm = "") {
    const listContainer = document.getElementById('loadOrdersList');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const search = searchTerm.toLowerCase();

    const filtered = externalOrdersMetadata.filter(o =>
        (o.name || "").toLowerCase().includes(search)
    ).sort((a, b) => b.timestamp - a.timestamp);

    if (filtered.length === 0) {
        listContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No hay órdenes externas registradas.</div>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'order-list-item';
        div.dataset.id = item.id;
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <h4 style="word-break: break-all; margin-right: 10px;">${item.name}</h4>
                <span class="type-tag ordpat">EXT</span>
            </div>
            <div class="meta">
                <span>${item.size}</span>
                <span>${item.date}</span>
            </div>
        `;

        // Handle selection
        div.onclick = (e) => {
            selectOrderForPreview(item.id, div);
        };

        listContainer.appendChild(div);
    });
}

async function selectOrderForPreview(id, element) {
    document.querySelectorAll('.order-list-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    document.getElementById('viewerInitialState').style.display = 'none';
    document.getElementById('viewerToolbar').style.display = 'flex';
    const iframe = document.getElementById('orderPDFViewer');
    iframe.style.display = 'block';

    const label = document.getElementById('viewingOrderLabel');
    const metadata = externalOrdersMetadata.find(m => m.id === id);
    label.textContent = `VISTA PREVIA: ${metadata ? metadata.name : 'Documento'}`;

    showNotification("Cargando documento...");

    try {
        const blob = await getOrderFromDB(id);
        if (!blob) throw new Error("File not found");

        const blobUrl = URL.createObjectURL(blob);

        // Revoke previous URL to avoid memory leaks
        if (iframe.dataset.currentUrl) {
            URL.revokeObjectURL(iframe.dataset.currentUrl);
        }

        iframe.src = blobUrl;
        iframe.dataset.currentUrl = blobUrl;
        iframe.classList.add('viewer-active');
    } catch (err) {
        console.error("Preview Fail:", err);
        showNotification("Error al cargar el archivo de la base de datos.", "error");
    }
}

async function deleteExternalOrder(id) {
    try {
        await deleteOrderFromDB(id);
        externalOrdersMetadata = externalOrdersMetadata.filter(m => m.id !== id);
        localStorage.setItem('externalOrdersMetadata', JSON.stringify(externalOrdersMetadata));

        // Reset viewer if deleted order was being viewed
        const iframe = document.getElementById('orderPDFViewer');
        if (iframe.dataset.currentUrl) {
            URL.revokeObjectURL(iframe.dataset.currentUrl);
        }
        iframe.src = '';
        iframe.style.display = 'none';
        document.getElementById('viewerToolbar').style.display = 'none';
        document.getElementById('viewerInitialState').style.display = 'flex';

        renderLoadOrdersView();
        showNotification("Orden eliminada del repositorio.");
    } catch (err) {
        console.error("Delete Fail:", err);
        showNotification("Error al eliminar el archivo.", "error");
    }
}

// --- GENERACIÓN DE PDF: ORDPAT-GT 100.51 ---

// --- HELPER: ANEXO DE PERSONAL ---
function addPersonnelAnnex(doc, pageWidth, filterShift = null, filterPost = null, fontSize = 8, itemsOverride = null) {
    // Si el snapshot está vacío o no se proporciona, intentamos usar el estado global como respaldo
    const sourceMatched = (itemsOverride && itemsOverride.length > 0) ? itemsOverride : [...(specialAssignments || []), ...(guardAssignments || [])];

    let all = [...sourceMatched];

    // 1. Filtrar solo si NO se proporciona un snapshot válido O si estamos forzando el filtrado global
    if (!itemsOverride || itemsOverride.length === 0) {
        const searchPostNorm = normalizeOpText(filterPost);
        const searchShiftNorm = normalizeOpText(filterShift);

        if (searchPostNorm) {
            all = all.filter(a => {
                const locNorm = normalizeOpText(a.assignedLocation);
                if (!locNorm) return false;
                return locNorm.includes(searchPostNorm) || searchPostNorm.includes(locNorm);
            });
        }

        if (searchShiftNorm) {
            all = all.filter(a => {
                const shipShiftNorm = normalizeOpText(a.assignedShift);
                if (!shipShiftNorm) return false;
                if (shipShiftNorm.includes("TODOS") || shipShiftNorm.includes("APOYO") || shipShiftNorm.includes("DISPONIBLE")) return true;
                return shipShiftNorm.includes(searchShiftNorm) || searchShiftNorm.includes(shipShiftNorm);
            });
        }
    }

    doc.addPage(pageWidth > 250 ? 'l' : 'p', 'mm', 'a4');
    const margin = 25.4;
    let startY = margin + 15;

    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);

    let annexTitle = 'ANEXO “A” (PERSONAL Y TAREAS)';
    if (filterPost || filterShift) {
        annexTitle += ` - ${filterPost || ''} ${filterShift || ''}`.trim();
    }
    annexTitle += ' DE LA ORDPAT GT 100.51';

    doc.text(annexTitle, pageWidth / 2, startY, { align: 'center' });
    startY += 8;

    if (all.length === 0) {
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text('AVISO: NO SE DETECTÓ PERSONAL ASIGNADO EN EL SISTEMA PARA ESTA CONFIGURACIÓN', pageWidth / 2, startY + 20, { align: 'center' });
        doc.setFontSize(9);
        doc.text('(Asegúrese de realizar la Distribución de Guardia antes de generar la orden)', pageWidth / 2, startY + 30, { align: 'center' });
        return;
    }

    const shiftsResources = [
        { name: "TURNO 1", time: "0800-1200 / 2000-0000" },
        { name: "TURNO 2", time: "1200-1600 / 0000-0400" },
        { name: "TURNO 3", time: "1600-2000 / 0400-0800" }
    ];

    const renderBlock = (title, items, bgColor, altColor) => {
        if (items.length === 0) return;

        // Título de Sección con Barra de Color
        doc.setFillColor(...bgColor);
        doc.rect(margin, startY, pageWidth - (margin * 2), fontSize * 0.8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(fontSize);
        doc.setFont(undefined, 'bold');
        doc.text(title.toUpperCase(), pageWidth / 2, startY + (fontSize * 0.5), { align: 'center' });
        doc.setTextColor(0, 0, 0); // Reset color
        startY += 8;
        if (startY > (pageWidth > 250 ? 170 : 250)) {
            doc.addPage(pageWidth > 250 ? 'l' : 'p', 'mm', 'a4');
            startY = 35;
        }

        const uniqueLocs = [...new Set(items.map(m => m.assignedLocation))];
        uniqueLocs.forEach(locName => {
            const locMembers = items.filter(m => m.assignedLocation === locName);
            const time = locMembers[0].assignedTime || "";

            // Validar espacio para el título del puesto + al menos una fila de tabla
            if (startY > (pageWidth > 250 ? 180 : 260)) {
                doc.addPage(pageWidth > 250 ? 'l' : 'p', 'mm', 'a4');
                startY = 35;
            }

            // Título de Puesto
            doc.setFillColor(...altColor);
            doc.rect(margin, startY, pageWidth - (margin * 2), 6, 'F');
            doc.setTextColor(...bgColor);
            doc.setFontSize(8);
            doc.text(`${locName} ${time ? ' - ' + time : ''}`, margin + 4, startY + 4.5);
            startY += 6;

            doc.autoTable({
                startY: startY,
                head: [['No.', 'Grado', 'Apellidos y Nombres', 'Cédula', 'Observaciones']],
                body: locMembers.map((p, idx) => [idx + 1, p.grade, p.name, p.idNum || "S/N", ""]),
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
                margin: { top: 38, left: margin, right: margin },
                didDrawPage: (data) => {
                    startY = data.cursor.y + 5;
                }
            });

            startY = (doc.lastAutoTable || doc.previousAutoTable || { finalY: startY }).finalY + 4;
        });
        startY += 2;
    };

    // Clasificar personal para visualización
    if (filterShift && !itemsOverride) {
        const filteredGuard = all.filter(a => !(a.assignedShift || "").toUpperCase().includes("APOYO"));
        // Modo Estricto para lista global
        const searchShift = filterShift.toUpperCase();
        const res = shiftsResources.find(r => r.name === searchShift);
        const displayTitle = res ? `${res.name} (${res.time})` : searchShift;
        renderBlock(displayTitle, filteredGuard, [14, 165, 233], [240, 249, 255]);
    } else if (itemsOverride) {
        // MODO SNAPSHOT: Respetar la lista exacta guardada sin re-filtrar
        const snapshotSpecial = all.filter(a => {
            const s = (a.assignedShift || "").toUpperCase();
            return s.includes("APOYO") || s.includes("INTERVENCION") || s.includes("DISPONIBLE") || s.includes("TODOS");
        });
        if (snapshotSpecial.length > 0) {
            renderBlock("INTERVENCIÓN / APOYO", snapshotSpecial, [239, 68, 68], [254, 242, 242]);
        }

        const snapshotTQ = all.filter(d => (d.assignedShift || "").toUpperCase().includes("TOQUE DE QUEDA"));
        if (snapshotTQ.length > 0) {
            renderBlock("CONTROL TOQUE DE QUEDA", snapshotTQ, [245, 158, 11], [255, 251, 235]);
        }

        const shiftMembersPool = all.filter(a => {
            const s = (a.assignedShift || "").toUpperCase();
            return !s.includes("APOYO") && !s.includes("TOQUE DE QUEDA") && !s.includes("INTERVENCION") && !s.includes("DISPONIBLE") && !s.includes("TODOS");
        });

        const shiftsInSnapshot = [...new Set(shiftMembersPool.map(m => m.assignedShift))];
        shiftsInSnapshot.forEach(sName => {
            const members = shiftMembersPool.filter(m => m.assignedShift === sName);
            const sNameNorm = normalizeOpText(sName);
            const res = shiftsResources.find(r => sNameNorm.includes(normalizeOpText(r.name)));
            const displayTitle = res ? `${res.name} (${res.time})` : (sName || "OPERACIÓN");
            renderBlock(displayTitle, members, [14, 165, 233], [240, 249, 255]);
        });
    } else {
        // Modo General
        const filteredSpecial = all.filter(a => (a.assignedShift || "").toUpperCase().includes("APOYO"));
        const filteredGuard = all.filter(a => !(a.assignedShift || "").toUpperCase().includes("APOYO"));

        if (filteredSpecial.length > 0) {
            renderBlock("TAREAS DE APOYO", filteredSpecial, [239, 68, 68], [254, 242, 242]);
        }

        const tqMembers = filteredGuard.filter(d => (d.assignedShift || "").toUpperCase().includes("TOQUE DE QUEDA"));
        if (tqMembers.length > 0) {
            renderBlock("CONTROL TOQUE DE QUEDA", tqMembers, [245, 158, 11], [255, 251, 235]);
        }

        shiftsResources.forEach(shift => {
            const shiftMembers = filteredGuard.filter(d => (d.assignedShift || "").toUpperCase().includes(shift.name));
            if (shiftMembers.length > 0) {
                renderBlock(`${shift.name} (${shift.time})`, shiftMembers, [14, 165, 233], [240, 249, 255]);
            }
        });
    }
}

/**
 * Helper para renderizado de bloques de texto con soporte de listas jerárquicas.
 */
function pdfRenderBlock(doc, content, x, maxWidth, config) {
    let { margin, pageWidth, limitY, currentY, startY_page, drawJustifiedLine, indent = 12, orientation = 'p', lineHeight = 5 } = config;
    const paragraphs = (content || 'N/A').split('\n');

    doc.setFont('helvetica', 'normal');

    paragraphs.forEach(para => {
        if (!para.trim()) return;

        let cleanPara = para.trim();

        // Refined bullet/number regex:
        // Group 1: The prefix (e.g., '1)', 'a.', '-', '•', '%Ï', '%')
        // Group 2: The text
        const match = cleanPara.match(/^([0-9a-z]+\)|[0-9a-z]+\.|·|•|[\u2022\u00b7]|\*|-|%[^\s0-9a-z]?|%)\s*(.*)$/i);

        if (match) {
            let prefix = match[1];
            let text = match[2];

            // Normalize weird placeholders like %Ï, %Ä, or just % to a clean bullet
            if (prefix.startsWith('%')) {
                prefix = "•";
            }

            // Hierarchy Identification:
            // Revised to match user's visual preference (less aggressive indents)
            let levelIndent = 0;
            let textIndent = 8;
            let isBoldHeader = false;

            if (prefix.match(/^\d+\.$/)) {
                // Level 1: 1. 2.
                levelIndent = 0;
                textIndent = 10;
                isBoldHeader = true;
            } else if (prefix.match(/^[A-Z]\.$/)) {
                // Level 2: A. B.
                levelIndent = 4;
                textIndent = 10;
                isBoldHeader = true;
            } else if (prefix.match(/^\d+\)$/)) {
                // Level 3: 1) 2)
                levelIndent = 10;
                textIndent = 8;
            } else if (prefix.match(/^[*•·-]/)) {
                // Level 4: Bullets (Indented more than Level 3)
                levelIndent = 16;
                textIndent = 8;
            } else if (prefix.match(/^[a-z]\)$/)) {
                // Level 5: a) b)
                levelIndent = 22;
                textIndent = 8;
            }

            const prefixX = x + levelIndent;
            const textX = prefixX + textIndent;
            const textWidth = pageWidth - textX - (margin * 0.8);

            if (currentY > limitY) { doc.addPage(orientation); currentY = startY_page; }

            // Render Prefix
            doc.setFont(undefined, 'bold');
            doc.text(prefix, prefixX, currentY);

            if (isBoldHeader) doc.setFont(undefined, 'bold');
            else doc.setFont(undefined, 'normal');

            // Render Text with justify support
            const words = text.split(/\s+/);
            let firstLineText = "";
            let i = 0;
            while (i < words.length) {
                let testText = firstLineText + (firstLineText ? " " : "") + words[i];
                if (doc.getTextWidth(testText) > textWidth) break;
                firstLineText = testText;
                i++;
            }

            // Draw first line (justified if not last)
            if (i === words.length || !drawJustifiedLine) {
                doc.text(firstLineText, textX, currentY);
            } else {
                drawJustifiedLine(doc, firstLineText, textX, currentY, textWidth);
            }
            currentY += lineHeight;

            // Update caller's perspective of indentation for next non-prefixed line
            // (Note: Since we return currentY, we'd need to return currentIndent too if we wanted 
            // perfect state, but within a block usually all sub-lines align to the first word)

            // Draw remaining lines
            const remainingText = words.slice(i).join(" ");
            if (remainingText) {
                doc.setFont(undefined, 'normal');
                const remainingLines = doc.splitTextToSize(remainingText, textWidth);
                remainingLines.forEach((line, idx) => {
                    if (currentY > limitY) { doc.addPage(orientation); currentY = startY_page; }

                    // Only justify if it's not the last line of the paragraph
                    if (idx < remainingLines.length - 1 && drawJustifiedLine) {
                        drawJustifiedLine(doc, line, textX, currentY, textWidth);
                    } else {
                        doc.text(line, textX, currentY);
                    }
                    currentY += lineHeight;
                });
            }
        } else {
            // Standard paragraph
            const lines = doc.splitTextToSize(cleanPara, maxWidth);
            lines.forEach((line, idx) => {
                if (currentY > limitY) { doc.addPage(orientation); currentY = startY_page; }

                if (idx < lines.length - 1 && drawJustifiedLine) {
                    drawJustifiedLine(doc, line, x, currentY, maxWidth);
                } else {
                    doc.text(line, x, currentY);
                }
                currentY += lineHeight;
            });
        }
    });
    return currentY;
}

// Helper to load images for PDF (Base64 or URL)
/**
 * Garantiza que la imagen del logo institucional esté cargada.
 */
function loadInstitutionalLogo() {
    return new Promise((resolve) => {
        const img = document.getElementById('institutionalLogo');
        if (!img) {
            console.error("Institutional logo element not found!");
            resolve(null);
            return;
        }

        if (img.complete && img.naturalWidth > 0) {
            resolve(img);
        } else {
            img.onload = () => {
                console.log("Institutional logo loaded successfully via event.");
                resolve(img);
            };
            img.onerror = () => {
                console.error("Failed to load institutional logo from:", img.src);
                resolve(null);
            };
            // Double check if it completed between our test and the event attachment
            if (img.complete) {
                resolve(img.naturalWidth > 0 ? img : null);
            }
        }
    });
}

async function generateORDPATPDF(id, options = {}) {
    console.log("Generating ORDPAT PDF for ID:", id);
    const op = patrolOrders.find(o => o.id === id);
    if (!op) return;

    // Usar el logo embebido como solución definitiva
    const logoImg = INSTITUTIONAL_LOGO_BASE64;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 25.4; // 1 pulgada
    let currentY = 65; // Adjusted to start below the right-aligned institutional header block

    // --- ENCABEZADO INSTITUCIONAL ORDPAT ---
    if (logoImg) {
        try {
            // Posicionar logo a la derecha según estándar ORDPAT (tamaño mínimo)
            doc.addImage(logoImg, 'JPEG', pageWidth - margin - 21, 12, 21, 21, undefined, 'FAST');
        } catch (err) {
            console.error("Error adding logo to ORDPAT:", err);
        }
    }

    // Helper: Renderizado de línea justificada manualmente
    const drawJustifiedLine = (doc, text, x, y, maxWidth) => {
        const words = text.trim().split(/\s+/);
        if (words.length <= 1) {
            doc.text(text, x, y);
            return;
        }

        const totalWidth = words.reduce((sum, word) => sum + doc.getTextWidth(word), 0);
        const freeSpace = maxWidth - totalWidth;
        const spaceBetween = freeSpace / (words.length - 1);

        let currentX = x;
        words.forEach((word) => {
            doc.text(word, currentX, y);
            currentX += doc.getTextWidth(word) + spaceBetween;
        });
    };

    // Helper para renderizar texto justificado multi-línea (actualiza currentY)
    const renderJustifiedLine = (text, x, y, maxWidth) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line, idx) => {
            if (currentY > 265) { doc.addPage('p'); currentY = 38; }
            if (idx === lines.length - 1) {
                doc.text(line, x, currentY);
            } else {
                drawJustifiedLine(doc, line, x, currentY, maxWidth);
            }
            currentY += 5;
        });
    };

    doc.setFont('helvetica');
    doc.setFontSize(8);

    // --- Generación de Contenido ---
    // --- 3. Document Identification (REFINADO SEGÚN IMAGEN) ---
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');

    // Título: ORDEN DE PATRULLA
    const mainTitle = "ORDEN DE PATRULLA";
    doc.text(mainTitle, margin, currentY);
    doc.line(margin, currentY + 1, margin + doc.getTextWidth(mainTitle), currentY + 1);
    currentY += 5;

    // ID de Orden (Normal)
    doc.setFont(undefined, 'normal');
    const dtgPart = op.idDTG || (op.fh || "").split('-')[0] || "XXXXXXR";
    const prefixPart = op.idPrefix || "ARE-ORDPAT-UT100.51.4";
    const ordIdStr = `${prefixPart}-${dtgPart.toUpperCase()}-2026-${op.nro}-S`;
    doc.text(ordIdStr, margin, currentY);
    currentY += 5;

    // Párrafo de Referencia (Justificado)
    doc.setFont(undefined, 'bold');
    let refText = op.idRefText;
    if (!refText) {
        const monthMap = { 'ENE': 'ENERO', 'FEB': 'FEBRERO', 'MAR': 'MARZO', 'ABR': 'ABRIL', 'MAY': 'MAYO', 'JUN': 'JUNIO', 'JUL': 'JULIO', 'AGO': 'AGOSTO', 'SEP': 'SEPTIEMBRE', 'OCT': 'OCTUBRE', 'NOV': 'NOVIEMBRE', 'DIC': 'DICIEMBRE' };
        const datePart = (op.fh || "").slice(0, 2);
        const monthPart = (op.fh || "").split('-')[1] || "";
        const monthFull = monthMap[monthPart.toUpperCase()] || monthPart;
        refText = `A LA ORDEN FRAGMENTARIA ARE-CODESC-OPE-XXXX-2026-P “ORDPAT-GT100.51-OPE-0446-2026-P” PARA LA EJECUCIÓN DE OPERACIONES MILITARES DE ÁMBITO INTERNO EN EL AROPE “GUAYAQUIL” DEL ${datePart} DE ${monthFull} 2026.`;
    }

    renderJustifiedLine(refText, margin, currentY, pageWidth - (2 * margin));
    currentY += 2;

    // REFERENCIAS with hanging indent (Aligned with image)
    doc.setFont(undefined, 'bold');
    const refHeader = "REFERENCIAS:";
    doc.text(refHeader, margin, currentY);
    doc.line(margin, currentY + 1, margin + doc.getTextWidth(refHeader), currentY + 1);

    const refItems = op.referencias || [];
    const labelX = margin + 25;
    const textX = labelX + 6;

    doc.setFont(undefined, 'normal');
    refItems.forEach((ref, idx) => {
        const label = (ref.label || `${String.fromCharCode(97 + idx)})`).replace('.', ')');
        const refContent = (typeof ref === 'string') ? ref : (ref.text || "");
        const wrappedRef = doc.splitTextToSize(refContent, pageWidth - textX - margin);

        doc.text(label, labelX, currentY);
        wrappedRef.forEach((line, lIdx) => {
            doc.text(line, textX, currentY);
            if (lIdx < wrappedRef.length - 1 || idx < refItems.length - 1) {
                currentY += 5;
            }
        });
    });
    currentY += 5;

    // ORGANIZACIÓN POR TAREAS (Table search format)
    if (op.orgPrincipal && op.orgPrincipal.sigla) {
        if (currentY > 250) { doc.addPage('p'); currentY = 38; }
        doc.setFont(undefined, 'bold');
        doc.text('ORGANIZACIÓN POR TAREAS:', margin, currentY);
        doc.line(margin, currentY + 1, margin + doc.getTextWidth('ORGANIZACIÓN POR TAREAS:'), currentY + 1);
        currentY += 8;

        // Principal row
        doc.text(`${op.orgPrincipal.sigla} ${op.orgPrincipal.nombre}`.toUpperCase(), margin, currentY);
        doc.text(op.orgPrincipal.comandante.toUpperCase(), pageWidth - margin, currentY, { align: 'right' });
        currentY += 6;

        // Sub-elements indented
        doc.setFont(undefined, 'normal');
        (op.orgElementos || []).forEach(el => {
            if (currentY > 270) { doc.addPage('p'); currentY = 38; }
            doc.text(`${el.sigla}    ${el.nombre}`.toUpperCase(), margin + 18, currentY);
            doc.text(el.personal.toUpperCase(), pageWidth - margin, currentY, { align: 'right' });
            currentY += 5;
        });
        currentY += 5;
    }

    currentY += 7;

    doc.text(`Huso Horario: ${op.huso}`, margin, currentY);
    currentY += 8;

    // --- Secciones ---
    // --- Helper: Renderizado de Bloques Militares ---
    // --- Helper: Adaptador para pdfRenderBlock ---
    const renderBlock = (content, x, maxWidth, blockIndent = 12) => {
        currentY = pdfRenderBlock(doc, content, x, maxWidth, {
            margin,
            pageWidth,
            limitY: 271.6,
            currentY,
            startY_page: 38,
            drawJustifiedLine: (d, t, tx, ty, tw) => drawJustifiedLine(d, t, tx, ty, tw),
            indent: blockIndent,
            orientation: 'p',
            lineHeight: 5
        });
    };

    const drawSection = (prefix, text, content) => {
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        const headerText = `${prefix} ${text}`;
        doc.text(headerText, margin, currentY);
        doc.line(margin, currentY + 1, margin + doc.getTextWidth(headerText), currentY + 1);
        currentY += 5;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        renderBlock(content, margin + 4, pageWidth - (margin * 2) - 4, 10);
        currentY += 5;
    };

    // 1. SITUACIÓN
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    const sitTitle = '1. SITUACIÓN';
    const sitTitleWidth = doc.getTextWidth(sitTitle);
    doc.text(sitTitle, margin, currentY);
    doc.line(margin, currentY + 1, margin + sitTitleWidth, currentY + 1);
    currentY += 5;

    // Main Situation Text
    if (op.situacionMain) {
        doc.setFont(undefined, 'normal');
        renderBlock(op.situacionMain, margin + 4, pageWidth - (margin * 2) - 4);
        currentY += 5;
    }

    const drawSubSectionRefined = (letter, title, content) => {
        doc.setFont(undefined, 'bold');
        const fullTitlePrefix = `${letter}. `;
        const fullTitle = `${fullTitlePrefix}${title}`;
        const titleWidth = doc.getTextWidth(fullTitle);
        doc.text(fullTitle, margin, currentY);
        doc.line(margin, currentY + 1, margin + titleWidth, currentY + 1);
        currentY += 7;

        doc.setFont(undefined, 'normal');
        const prefixWidth = doc.getTextWidth(fullTitlePrefix);
        const subMaxWidth = pageWidth - (margin * 2) - prefixWidth;
        renderBlock(content, margin + prefixWidth, subMaxWidth, 10);
        currentY += 5;
    };

    drawSubSectionRefined('a', 'Amenazas y Riesgos', op.amenaza);

    // b. Organización de las Fuerzas (Table-style)
    doc.setFont(undefined, 'bold');
    const orgTitle = 'b. Organización de las Fuerzas';
    const orgTitleWidth = doc.getTextWidth(orgTitle);
    doc.text(orgTitle, margin, currentY);
    doc.line(margin, currentY + 1, margin + orgTitleWidth, currentY + 1);
    currentY += 5;

    if (op.situacionOrgHeader) {
        doc.setFont(undefined, 'bold');
        doc.text(op.situacionOrgHeader.toUpperCase(), margin + 4, currentY);
        currentY += 7;
    }

    if (op.organizacion && op.organizacion.length > 0) {
        const orgRows = op.organizacion.map(o => [o.unidad, o.oficiales, o.tripulantes]);
        doc.autoTable({
            startY: currentY,
            body: orgRows,
            theme: 'grid',
            showHead: false,
            styles: { fontSize: 10, font: 'helvetica', cellPadding: 3 },
            margin: { top: 38, left: margin + 4 },
            didDrawPage: (data) => { currentY = data.cursor.y + 10; }
        });
        currentY = (doc.lastAutoTable || doc.previousAutoTable || { finalY: currentY }).finalY + 7;
    } else {
        doc.setFont(undefined, 'normal');
        doc.text('N/A', margin + 4, currentY);
        currentY += 10;
    }

    drawSection('2.', 'MISIÓN', op.mision);

    // Ejecución Especial (Con Tabla)
    doc.setFont(undefined, 'bold');
    const ejeTitle = '3. EJECUCIÓN';
    const ejeTitleWidth = doc.getTextWidth(ejeTitle);
    doc.text(ejeTitle, margin, currentY);
    doc.line(margin, currentY + 1, margin + ejeTitleWidth, currentY + 1);
    currentY += 7;

    currentY += 2;

    doc.setFont(undefined, 'normal');
    // Align with section header numbering offset or standard margin
    const conOffset = doc.getTextWidth('3. ');
    renderBlock(op.concepto, margin + conOffset, pageWidth - (margin * 2) - conOffset, 10);
    currentY += 5;

    doc.setFont(undefined, 'bold');
    doc.text('B. TAREAS A LAS UNIDADES:', margin, currentY);
    currentY += 5;

    const tableRows = op.tareas.map(t => [t.patrulla, t.lugar, t.nominativos, t.hora, t.personal]);
    doc.autoTable({
        startY: currentY,
        head: [['PATRULLA', 'LUGAR', 'NOMINATIVO', 'HORA', 'PERSONAL']],
        body: tableRows,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [51, 65, 85] },
        margin: { top: 38, left: margin + 4 },
        didDrawPage: (data) => { currentY = data.cursor.y + 10; }
    });
    currentY = (doc.lastAutoTable || doc.previousAutoTable || { finalY: currentY }).finalY + 7;

    // Observaciones adicionales a las Tareas
    if (op.tareasExtras) {
        renderBlock(op.tareasExtras, margin + 4, pageWidth - (margin * 2) - 4, 10);
        currentY += 5;
    }

    drawSubSectionRefined('C', 'Instrucciones de Coordinación', op.coordinacion);
    drawSection('4.', 'ADMINISTRACIÓN Y LOGÍSTICA', op.logistica);
    drawSection('5.', 'MANDO Y COMUNICACIONES', op.mando);
    drawSection('6.', 'MANDO Y CONTROL', op.mandoControl || '');
    drawSection('7.', 'INSTRUCCIONES PARA CURSAR EL RECIBO', op.recibo || '');

    // --- Firma ---
    if (currentY > 210) { doc.addPage(); currentY = 38; }
    currentY += 15;

    doc.setFontSize(8);

    // DUAL SIGNATURE: ET (Left) and GT (Right/Center)
    const midX = pageWidth / 2;
    const colLeftX = margin + 30;
    const colRightX = pageWidth - margin - 30;

    // Linea ET (JEFE ELEMENTO TAREA)
    if (op.etNombre) {
        doc.setFont(undefined, 'bold');
        doc.text('JEFE DEL ELEMENTO DE TAREA', colLeftX, currentY, { align: 'center' });
        doc.text('COMANDANTE DE LA UT 100.51.4', colRightX, currentY, { align: 'center' });
        currentY += 20;

        doc.setFont(undefined, 'normal');
        doc.text(op.etNombre.toUpperCase(), colLeftX, currentY, { align: 'center' });
        doc.text(op.firmanteNombre.toUpperCase(), colRightX, currentY, { align: 'center' });
        currentY += 4;

        doc.setFont(undefined, 'bold');
        doc.text(op.etCargo.toUpperCase(), colLeftX, currentY, { align: 'center' });
        doc.text(op.firmanteGrado.toUpperCase(), colRightX, currentY, { align: 'center' });
        currentY += 4;
        doc.text('', colLeftX, currentY); // placeholder
        doc.text(op.firmanteCargo.toUpperCase(), colRightX, currentY, { align: 'center' });
    } else {
        // Fallback to single centered signature if ET not provided
        const startX_center = pageWidth / 2;
        doc.text('__________________________', startX_center, currentY, { align: 'center' });
        currentY += 5;
        doc.text(op.firmanteNombre.toUpperCase(), startX_center, currentY, { align: 'center' });
        currentY += 4;
        doc.text(op.firmanteGrado.toUpperCase(), startX_center, currentY, { align: 'center' });
        currentY += 4;
        doc.text(op.firmanteCargo.toUpperCase(), startX_center, currentY, { align: 'center' });
    }

    currentY += 8;
    // Linea 4: Secundario/OMAI (Centrado, Itálica)
    if (op.firmanteSecundario) {
        doc.setFont(undefined, 'italic');
        doc.setFontSize(9);
        doc.text(op.firmanteSecundario, pageWidth / 2, currentY, { align: 'center' });
        doc.setFont(undefined, 'normal');
        currentY += 10;
    }

    // Sumilla (Abajo a la izquierda)
    if (op.sumilla) {
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);
        doc.text('|', margin, currentY + 10);
        doc.text(`${op.sumilla.toUpperCase()}. -`, margin, currentY + 14);
    }

    addPersonnelAnnex(doc, pageWidth, null, null, 8, op.personnelSnapshot);

    // --- LOOP POST-GENERACIÓN: HEADERS Y PAGINACIÓN ---
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        // 1. Clasificación (Top Centered)
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(239, 68, 68);
        doc.text('SECRETO', pageWidth / 2, 12, { align: 'center' });

        // 2. Bloque Institucional (Right Aligned)
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        const rightX = pageWidth - margin;
        let rightY = 18;

        // Linea Ejemplar
        doc.setFont(undefined, 'bold');
        doc.text('Ejemplar No. ...', rightX - 16, rightY, { align: 'right' });
        doc.setTextColor(239, 68, 68);
        doc.text('01', rightX - 11, rightY, { align: 'right' });
        doc.setTextColor(0, 0, 0);
        doc.text('... de ...', rightX - 4, rightY, { align: 'right' });
        doc.setTextColor(239, 68, 68);
        doc.text('01', rightX + 1, rightY, { align: 'right' });
        doc.setTextColor(0, 0, 0);
        doc.text('...', rightX + 5, rightY, { align: 'right' });
        rightY += 4;

        // Linea Página (DINÁMICA)
        doc.text('Página No _ ', rightX - 12, rightY, { align: 'right' });
        doc.setTextColor(239, 68, 68);
        doc.text(`${i}`, rightX - 8, rightY, { align: 'right' });
        doc.setTextColor(0, 0, 0);
        doc.text(' de ...', rightX - 3, rightY, { align: 'right' });
        doc.setTextColor(239, 68, 68);
        doc.text(`${totalPages}`, rightX + 2, rightY, { align: 'right' });
        doc.setTextColor(0, 0, 0);
        doc.text('...', rightX + 6, rightY, { align: 'right' });
        rightY += 6;

        // Datos Institucionales y de Referencia (Solo en la Primera Página)
        if (i === 1) {
            doc.setFont(undefined, 'bold');
            doc.text('CGT-100.51 “SEGURIDAD MARÍTIMA”', rightX, rightY, { align: 'right' });
            rightY += 4;
            doc.setFont(undefined, 'normal');
            doc.text('Comandante en Jefe de la Escuadra', rightX, rightY, { align: 'right' });
            rightY += 4;
            doc.text('Guayaquil - Ecuador', rightX, rightY, { align: 'right' });
            rightY += 4;
            doc.text(`F/H: ${op.fh || '---'}`, rightX, rightY, { align: 'right' });
            rightY += 4;
            doc.text(`MSJ. Ref.: ${op.msj || '---'}`, rightX, rightY, { align: 'right' });
        }

        // Clasificación al Pie (Opcional pero recomendado para SECRETO)
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(239, 68, 68);
        doc.text('SECRETO', pageWidth / 2, 285, { align: 'center' });
    }

    if (options.returnBlob) {
        return doc.output('bloburl');
    }

    // Solución Definitiva: Guardar y mostrar en nueva pestaña
    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
    doc.save(`ORDPAT_${op.nro.replace(/[/\\?%*:|"<>]/g, '-')}.pdf`);
}
