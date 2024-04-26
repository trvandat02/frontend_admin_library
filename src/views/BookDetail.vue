<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import booksService from '@/services/book.service';
import borrowedBookService from '@/services/borrowedbook.service';
import router from '@/router';

const route = useRoute();
const id = route.params.id;
const books = route.meta.books;
const user = route.meta.user;

const book = books.find(f => f._id == id);
const quantity = ref(0);

const handleBorrowing = async (e) => {
  e.preventDefault();
  if (user) {
    if ((quantity.value > 0) && (quantity.value <= book.stored)) {
      const borrowDate = new Date(); // Ngày mượn sách
      const returnDateValue = new Date(returnDate.value); // Ngày trả sách

      if (returnDateValue >= borrowDate) { // Kiểm tra tính hợp lệ của returnDate
        const values = {
          'uid': user._id,
          'bid': book._id,
          'title': book.title,
          'img': book.img,
          'quantity': quantity.value,
          'borrowDate': borrowDate,
          'returnDate': returnDateValue,
          'returned': false,
        }
        const borrowed = await borrowedBookService.create(values);
        if (borrowed) {
          const values = {
            'borrowedTimes': book.borrowedTimes + 1,
            'stored': book.stored - quantity.value,
          }
          const borrowedTimes = await booksService.update(book._id, values);
          if (borrowedTimes) {
            alert("Mượn sách thành công!");
            setTimeout(() => {
              location.reload();
            }, 1);
          }
        }
      } else {
        alert("Ngày trả sách không hợp lệ!");
      }
    } else {
      alert("Số sách mượn không hợp lệ!");
    }
  } else {
    alert("Bạn nên đăng nhập trước!");
  }
}
</script>

  <template>
    <div>
      <h1 class="text-green-500 font-bold text-2xl dark:text-white text-center mb-6">
        Thông tin sách
      </h1>
  
      <div class="lg:grid lg:grid-cols-2">
        <div class="lg:col-span-1 flex justify-end items-center">
          <div class="relative" style="margin-right: 30px;">
            <img class="lg:w-72 w-64 p-1 rounded-md border border-blue-300 dark:border-gray-600" :src="`http://localhost:3001/${book.img}`" alt="book">
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="lg:grid lg:grid-cols-2 lg:gap-4">
            <div class="text-left">
              <dl class="text-gray-900 dark:text-white">
                <div class="pb-3">
                  <dt class="mb-1 text-lg font-semibold">
                    Tên sách: {{ book.title }}
                  </dt>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-lg font-semibold">
                    Tác giả: {{ book.author }}
                  </dt>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-lg font-semibold">
                    Thể loại: {{ book.category }}
                  </dt>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-lg font-semibold">
                    Nhà xuất bản: {{ book.publisher }}
                  </dt>
                </div>
                <div class="flex flex-col pt-3">
                  <dt class="mb-1 text-lg font-semibold">
                    Số lượng còn: {{ book.stored }}
                  </dt>
                </div>
                <div class="mb-4">
                  <label for="quantity" class="text-lg font-semibold">Số lượng mượn: </label>
                  <input type="number" id="quantity" v-model="quantity" class="w-32 p-2 border border-gray-300 rounded-md">
                </div>
                <div class="mb-4">
                  <label for="returnDate" class="text-lg font-semibold">Ngày trả: </label>
                  <input type="date" id="returnDate" v-model="returnDate" class="w-48 p-2 border border-gray-300 rounded-md" required>
                </div>
                <button @click="handleBorrowing" class="px-4 py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit</button>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>