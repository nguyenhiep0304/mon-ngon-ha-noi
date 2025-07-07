<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script setup>
import L, { marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, render, ref , nextTick} from 'vue'

const map = ref(null)
const search = ref('')
const markers = ref([])

const allPlaces = [
    {
        name: 'Bún Thang',
        lat: 21.041066755289954,
        lng: 105.84398752853204,
        youtube: 'https://www.youtube.com/embed/pe5lPs0rJKk'
    },
    {
        name: 'Cà Phê Trứng',
        lat: 21.033925612980486,
        lng: 105.85520767392165,
        youtube: 'https://www.youtube.com/embed/2qFrRcQxSXw'
    },
    {
        name: 'Cá diếc kho tương',
        lat: 21.01459539052181,
        lng: 105.8477359788951,
        youtube: 'https://www.youtube.com/embed/P7_kVZ9LaOk'
    },
    {
        name: 'Bánh tôm Hà Nội',
        lat: 21.00996225744082,
        lng: 105.84999300298189,
        youtube: 'https://www.youtube.com/embed/TsdMgRKdgU0'
    },
    {
        name: 'Bún ốc Bà Ngoại',
        lat: 21.067269443230984,
        lng: 105.82433024607597,
        youtube: 'https://www.youtube.com/embed/2DE7lgMBuRE'
    },
    {
        name: 'Bánh mảnh cộng',
        lat: 21.035076166617422,
        lng: 105.84497989018631,
        youtube: 'https://www.youtube.com/embed/uk6ELs-eYHI'
    },
    {
        name: 'Phở xào Hàng Buồm',
        lat: 21.019851116185386,
        lng: 105.81743854625839,
        youtube: 'https://www.youtube.com/embed/0EK7USZ2h9c'
    },
    {
        name: 'Chả cá Hà Nội',
        lat: 21.016534264846165,
        lng: 105.81027168759898,
        youtube: 'https://www.youtube.com/embed/xwqAgu7v5cg'
    },
    {
        name: 'Thạch đen sương sáo',
        lat: 20.99545824231666,
        lng: 105.85406868929877,
        youtube: 'https://www.youtube.com/embed/fJJmK7v6vPc'
    },
    {
        name: 'Ốc om chuối đậu',
        lat: 21.03498092482713,
        lng: 105.81119671854852,
        youtube: 'https://www.youtube.com/embed/HQ1kiPfwnkc'
    },
    {
        name: 'Món ngon từ con Vờ Vờ',
        lat: 21.021176876945788,
        lng: 105.84905467565963,
        youtube: 'https://www.youtube.com/embed/lJKCFY_9N5Y'
    },
    {
        name: 'Mơ má đào ngâm muối đường',
        lat: 21.012315038833908,
        lng: 105.81785873170043,
        youtube: 'https://www.youtube.com/embed/njUcc--wB-A'
    },
    {
        name: 'Bún ốc nguội',
        lat: 21.019317205703544,
        lng: 105.84807354589314,
        youtube: 'https://www.youtube.com/embed/XBknALo5bac'
    },
    {
        name: 'Nộm hoa chuối quán Lệ',
        lat: 21.01446096957185,
        lng: 105.85045973127045,
        youtube: 'https://www.youtube.com/embed/-FkNGGt3STM'
    },
    {
        name: 'Phở cuốn Ngũ Xã',
        lat: 21.04616923750185,
        lng: 105.84110480333389,
        youtube: 'https://www.youtube.com/embed/P2e5mg9iVeI'
    },
    {
        name: 'Phở gà Hà Nội',
        lat: 21.030309231295522,
        lng: 105.85043863188231,
        youtube: 'https://www.youtube.com/embed/FBEjYgctYGE'
    },
    {
        name: 'Nem ốc Hà Nội',
        lat: 21.022758815752688,
        lng: 105.85734813049748,
        youtube: 'https://www.youtube.com/embed/Qg2F8Q0gc2g'
    },
    {
        name: 'Vịt lọc cuốn',
        lat: 21.016031219949518,
        lng: 105.81082748707894,
        youtube: 'https://www.youtube.com/embed/-ZQIgrKDhZE'
    },
    {
        name: 'Chả mỡ làng Ước Lễ',
        lat: 21.0264390370801,
        lng: 105.89131574869133,
        youtube: 'https://www.youtube.com/embed/qC3MdIARiRg'
    },
    {
        name: 'Cá mòi chưng tương nếp',
        lat: 21.022256127629387,
        lng: 105.85552010458036,
        youtube: 'https://www.youtube.com/embed/MRcl7kL0Wa0'
    },
    {
        name: 'Xôi “Ngũ Bảo Liên Hoa”',
        lat: 21.014294513629764,
        lng: 105.85054031700619,
        youtube: 'https://www.youtube.com/embed/3O-x2uC-jBg'
    },
    {
        name: 'Bún chả que tre',
        lat: 21.02651196479755,
        lng: 105.84340849000533,
        youtube: 'https://www.youtube.com/embed/CGROwiNCS9M'
    }

]

const currentPlaces = ref(allPlaces)
const filterPlaces = () => {
    if (search.value.trim() === '') {
        currentPlaces.value = allPlaces
    } else {
        const query = search.value.toLowerCase()
        currentPlaces.value = allPlaces.filter(place => place.name.toLowerCase().includes(query))
    }
    updateMarkers()
}

onMounted(async() => {
    await nextTick() // Ensure the DOM is ready before initializing the map

    map.value = L.map('map', {
        maxBounds:[
            [20.9, 105.7], // Southwest corner
            [21.2, 106.0]  // Northeast corner
        ],
        maxBoundsViscosity: 1.0,//Giu nguoi dung trong ban do
        zoomControl: true,
        minZoom : 10,
        maxZoom: 18
    }).setView([21.0285, 105.8544], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.value)

    renderMarkers()
})

function renderMarkers(){
    
    markers.value.forEach(marker => {
        map.value.removeLayer(marker)
    })
    markers.value = []

    currentPlaces.value.forEach(place => {
        const marker = L.marker([place.lat, place.lng]).addTo(map.value)
        marker.bindPopup(`
            <strong>${place.name}</strong><br>
            <iframe width="300" height="200" src="${place.youtube}" frameborder="0" allowfullscreen></iframe>
        `)
        markers.value.push(marker)
        //Them su kien click cho cac marker
        marker.on('click', () =>{
            map.value.setView([place.lat, place.lng], 17, {
                animate: true,
                duration: 0.5
            }) // Zoom in on the marker
            marker.openPopup() // Open the popup when the marker is clicked
        })

        markers.value.push(marker)
    })

    
}



/*
onMounted(() => {
    const map = L.map('map').setView([21.0285, 105.8544], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const places = [
    {
        name: 'Bún Thang',
        lat: 21.041066755289954,
        lng: 105.84398752853204,
        youtube: 'https://www.youtube.com/embed/pe5lPs0rJKk'
    },
    {
        name: 'Cà Phê Trứng',
        lat: 21.033925612980486,
        lng: 105.85520767392165,
        youtube: 'https://www.youtube.com/embed/2qFrRcQxSXw'
    },
    {
        name: 'Cá diếc kho tương',
        lat: 21.01459539052181,
        lng: 105.8477359788951,
        youtube: 'https://www.youtube.com/embed/P7_kVZ9LaOk'
    },
    {
        name: 'Bánh tôm Hà Nội',
        lat: 21.00996225744082,
        lng: 105.84999300298189,
        youtube: 'https://www.youtube.com/embed/TsdMgRKdgU0'
    },
    {
        name: 'Bún ốc Bà Ngoại',
        lat: 21.067269443230984,
        lng: 105.82433024607597,
        youtube: 'https://www.youtube.com/embed/2DE7lgMBuRE'
    },
    {
        name: 'Bánh mảnh cộng',
        lat: 21.035076166617422,
        lng: 105.84497989018631,
        youtube: 'https://www.youtube.com/embed/uk6ELs-eYHI'
    },
    {
        name: 'Phở xào Hàng Buồm',
        lat: 21.019851116185386,
        lng: 105.81743854625839,
        youtube: 'https://www.youtube.com/embed/0EK7USZ2h9c'
    },
    {
        name: 'Chả cá Hà Nội',
        lat: 21.016534264846165,
        lng: 105.81027168759898,
        youtube: 'https://www.youtube.com/embed/xwqAgu7v5cg'
    },
    {
        name: 'Thạch đen sương sáo',
        lat: 20.99545824231666,
        lng: 105.85406868929877,
        youtube: 'https://www.youtube.com/embed/fJJmK7v6vPc'
    },
    {
        name: 'Ốc om chuối đậu',
        lat: 21.03498092482713,
        lng: 105.81119671854852,
        youtube: 'https://www.youtube.com/embed/HQ1kiPfwnkc'
    },
    {
        name: 'Món ngon từ con Vờ Vờ',
        lat: 21.021176876945788,
        lng: 105.84905467565963,
        youtube: 'https://www.youtube.com/embed/lJKCFY_9N5Y'
    },
    {
        name: 'Mơ má đào ngâm muối đường',
        lat: 21.012315038833908,
        lng: 105.81785873170043,
        youtube: 'https://www.youtube.com/embed/njUcc--wB-A'
    },
    {
        name: 'Bún ốc nguội',
        lat: 21.019317205703544,
        lng: 105.84807354589314,
        youtube: 'https://www.youtube.com/embed/XBknALo5bac'
    },
    {
        name: 'Nộm hoa chuối quán Lệ',
        lat: 21.01446096957185,
        lng: 105.85045973127045,
        youtube: 'https://www.youtube.com/embed/-FkNGGt3STM'
    },
    {
        name: 'Phở cuốn Ngũ Xã',
        lat: 21.04616923750185,
        lng: 105.84110480333389,
        youtube: 'https://www.youtube.com/embed/P2e5mg9iVeI'
    },
    {
        name: 'Phở gà Hà Nội',
        lat: 21.030309231295522,
        lng: 105.85043863188231,
        youtube: 'https://www.youtube.com/embed/FBEjYgctYGE'
    },
    {
        name: 'Nem ốc Hà Nội',
        lat: 21.022758815752688,
        lng: 105.85734813049748,
        youtube: 'https://www.youtube.com/embed/Qg2F8Q0gc2g'
    },
    {
        name: 'Vịt lọc cuốn',
        lat: 21.016031219949518,
        lng: 105.81082748707894,
        youtube: 'https://www.youtube.com/embed/-ZQIgrKDhZE'
    },
    {
        name: 'Chả mỡ làng Ước Lễ',
        lat: 21.0264390370801,
        lng: 105.89131574869133,
        youtube: 'https://www.youtube.com/embed/qC3MdIARiRg'
    },
    {
        name: 'Cá mòi chưng tương nếp',
        lat: 21.022256127629387,
        lng: 105.85552010458036,
        youtube: 'https://www.youtube.com/embed/MRcl7kL0Wa0'
    },
    {
        name: 'Xôi “Ngũ Bảo Liên Hoa”',
        lat: 21.014294513629764,
        lng: 105.85054031700619,
        youtube: 'https://www.youtube.com/embed/3O-x2uC-jBg'
    },
    {
        name: 'Bún chả que tre',
        lat: 21.02651196479755,
        lng: 105.84340849000533,
        youtube: 'https://www.youtube.com/embed/CGROwiNCS9M'
    }
    ]

    places.forEach(place => {
    const marker = L.marker([place.lat, place.lng]).addTo(map)
    marker.bindPopup(`
        <strong>${place.name}</strong><br>
        <iframe width="300" height="200" src="${place.youtube}" frameborder="0" allowfullscreen></iframe>
    `)
    })
})

*/

</script>

<style scoped>
#map {
    height: 100vh;
    width: 100vw;
    margin-top: 1rem;
}
</style>