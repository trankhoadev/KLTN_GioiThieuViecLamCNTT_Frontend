<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg">
        <div class="content">
          <h3>Liên Hệ</h3>
          <h4>Địa chỉ văn phòng</h4>
          <span>60 Nguyễn Văn Thủ, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</span>
          <h4>Dành cho nhà tuyển dụng</h4>

          <ul>
            Hãy gọi ngay cho đội ngũ Bán Hàng của chúng tôi:
            <li>HCM: +84 977 460 519</li>
            <li>Hà Nội: +84 983 131 351</li>
            <a href="">Hãy để lại thông tin</a> để được chúng tôi sẽ liên hệ tư vấn ngay
          </ul>
          Chúng tôi sẵn sàng để giúp bạn phát triển

          <h4>Dành cho ứng viên</h4>
          <ul>
            <li>Đặt câu hỏi trên Facebook TimViecNhanh247</li>
            <li>Đọc các bài blog của chúng tôi về bí quyết viết CV và kỹ năng phỏng vấn</li>
            <li>Gọi chúng tôi theo số +84 28 6681 1397</li>
          </ul>
          Kết nối với chúng tôi qua hệ thống mạng xã hội
          <ul>
            <li>
              <router-link to="/">
                <q-btn icon="facebook" />
              </router-link>

              <router-link to="/">
                <q-btn icon="ion-logo-twitter" />
              </router-link>

              <router-link to="/">
                <q-btn icon="ion-logo-youtube" />
              </router-link>

              <router-link to="/">
                <q-btn icon="ion-logo-instagram" />
              </router-link>
            </li>
          </ul>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>

</script>

<style lang="scss" scoped>
a {
  color: #4287f5;
}

.content {
  font-size: 1.2em;
}

ul {
  padding: 0 2em;

  li {
    list-style: circle;

  }
}

h4 {
  padding-top: 1em;
}
</style>
