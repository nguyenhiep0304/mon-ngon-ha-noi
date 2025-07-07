<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
    <div class="bg-white p-10 rounded-xl shadow-2xl w-full max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-blue-700 mb-8">THÊM ĐỊA ĐIỂM MÓN ĂN</h2>

      <table class="w-full table-auto mx-auto">
        <tbody>
          <tr class="table-row-spacing">
            <td class="text-right pr-8 align-middle font-medium text-gray-700 w-1/3">
              Tên địa điểm
            </td>
            <td>
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="VD: Bún chả Hàng Mành"
                class="input-style"
                required
              />
            </td>
          </tr>

          <tr class="table-row-spacing">
            <td class="text-right pr-8 align-middle font-medium text-gray-700">
              Vĩ độ (Lat)
            </td>
            <td>
              <input
                id="lat"
                v-model="lat"
                type="number"
                step="any"
                placeholder="21.0285"
                class="input-style"
                required
              />
            </td>
          </tr>

          <tr class="table-row-spacing">
            <td class="text-right pr-8 align-middle font-medium text-gray-700">
              Kinh độ (Lng)
            </td>
            <td>
              <input
                id="lng"
                v-model="lng"
                type="number"
                step="any"
                placeholder="105.8542"
                class="input-style"
                required
              />
            </td>
          </tr>

          <tr class="table-row-spacing">
            <td class="text-right pr-8 align-middle font-medium text-gray-700">
              Link video YouTube
            </td>
            <td>
              <input
                id="youtube"
                v-model="youtube"
                type="url"
                placeholder="https://www.youtube.com/embed/your-video-id"
                class="input-style"
                required
              />
            </td>
          </tr>

          <tr>
            <td colspan="2" class="text-center pt-6">
              <button
                @click="addPlace"
                class="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2 mx-auto"
              >
                ✅ Thêm địa điểm
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const lat = ref('')
const lng = ref('')
const youtube = ref('')

async function addPlace() {
  const newPlace = {
    name: name.value,
    lat: parseFloat(lat.value),
    lng: parseFloat(lng.value),
    youtube: youtube.value
  }

  try {
    await axios.post('https://your-api-url.com/places', newPlace)
    alert('🎉 Địa điểm đã được thêm lên API!')

    name.value = ''
    lat.value = ''
    lng.value = ''
    youtube.value = ''
  } catch (error) {
    console.error(error)
    alert('Có lỗi xảy ra khi thêm địa điểm vào API.')
  }
}
</script>

<style scoped>
.input-style {
  width: 150%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
  background-color: white;
}
.input-style:focus {
  box-shadow: 0 0 0 2px #60a5fa;
  border-color: transparent;
}
table {
  margin:auto;
}
td{
  padding: 1rem;
  vertical-align: middle;
}
.table-row-spacing {
  height: 4rem;
}
</style>
