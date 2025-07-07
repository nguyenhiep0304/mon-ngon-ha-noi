<template>
  <div id="map" style="width: 100%; height: 80vh; margin-top: 1rem;"></div>
</template>

<script>
export default {
  name: "GoogleMaps",
  mounted() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDrhwJukUUnUEiJHLGIKNuLTY46XlcO_3M&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = this.initMap;
  },
  beforeUnmount() {
    // Xóa callback để tránh rò rỉ bộ nhớ
    delete window.initMap;
    // Xóa script Google Maps nếu cần
    const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
    scripts.forEach(s => s.remove());
  },
  methods: {
    initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 21.0285, lng: 105.8544 },
        zoom: 13,
      });

      const places = [
        {
          name: "Bún chả Hàng Mành",
          lat: 21.0333,
          lng: 105.8462,
          youtube: "https://www.youtube.com/embed/CGROwiNCS9M",
        },
        {
          name: "Phở Thìn Lò Đúc",
          lat: 21.0145,
          lng: 105.859,
          youtube: "https://www.youtube.com/embed/CGROwiNCS9M",
        },
      ];

      places.forEach((place) => {
        const marker = new google.maps.Marker({
          position: { lat: place.lat, lng: place.lng },
          map,
          title: place.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3>${place.name}</h3>
              <iframe width="600" height="400" 
                      src="${place.youtube}" 
                      frameborder="0" allowfullscreen></iframe>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    },
  },
};
</script>
