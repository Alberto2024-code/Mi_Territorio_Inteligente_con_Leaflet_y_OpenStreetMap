let latitud
let longitud

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (coordenadas)=>{
            latitud=coordenadas.coords.latitude
            longitud=coordenadas.coords.longitude

            const coordenada=[latitud,longitud]
            let map = L.map('map').setView(coordenada, 16)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);


            let marcador=L.marker(coordenada).addTo(map)
            

            marcador.bindPopup("<b>Estoy aqui...</b><br>Mis coordenadas son : <br>"
                +"Latitud : "+latitud+ " ,<br> Longitud : "+longitud
            ).openPopup();

              //  CÍRCULO
            let circulo = L.circle(coordenada, {
                color: 'blue',
                fillColor: '#ff3030',
                fillOpacity: 0.4,
                radius: 30
            }).addTo(map);
            circulo.bindPopup("Área aproximada de mi casa");

            // 🔺 POLÍGONO
            let poligono = L.polygon([
                [21.27045, -98.44340],
                [21.27045, -98.44348],
                [21.27040, -98.44348],
                [21.27040, -98.44340]
            ]).addTo(map);

            poligono.bindPopup("Perímetro de mi casa");

            poligono.on('click', function(){
                alert("Estás dentro del perímetro de mi casa");
            });

        },
        (error)=>{
            alert("si tiene geolocalizacion el navegador pero algo paso....")
        })
}else{
    alert("no tiene geolocalizacion el navegador")
}
/*  color: 'red',
             fillColor: '#f03',
             fillOpacity: 0.5,
             radius: 500
             }).addTo(map);
             
             let polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
                ]).addTo(map);/*/