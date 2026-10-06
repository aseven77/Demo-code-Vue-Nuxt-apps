<template>
  <NuxtLayout name="error-layout">
    <h1 class="text-[120px] font-bold text-white leading-[120px] mb-4 tracking-[-6px]">
      {{ error?.statusCode }}
    </h1>
    <template v-if="error?.statusCode === 404">
      <h2 class="text-[36px] tracking-[-2px] text-(--ds-color-primitive-grey-900) font-bold mb-2">
        {{ $t('error404.title') }}
      </h2>
      <p class="font-medium text-center leading-5 mb-8">
        {{ $t('error404.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          :to="Navigations.LANDING"
          class="block w-full sm:w-auto"
        >
          <UButton class="w-full">
            {{ $t('error404.mainButton') }}
          </UButton>
        </NuxtLink>
      </div>
    </template>
    <template v-else>
      <h2 class="text-[36px] tracking-[-2px] text-(--ds-color-primitive-grey-900) font-bold mb-2">
        {{ $t('error500.title') }}
      </h2>
      <p class="font-medium text-center leading-5 mb-8">
        {{ $t('error500.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          :to="Navigations.LANDING"
          class="block w-full sm:w-auto"
        >
          <UButton class="w-full">
            {{ $t('error500.mainButton') }}
          </UButton>
        </NuxtLink>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { Navigations } from '~/navigations'

const { t } = useI18n()
const error = useError()

useSeoMeta({
  title: error.value?.statusCode === 404
    ? t('error404.pageNotFound')
    : t('error500.serverError'),
})
</script>

<style>
.error-container {
  background-image: url("data:image/svg+xml,%0A%3Csvg width='393' height='786' viewBox='0 0 393 786' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_f_3539_399128)'%3E%3Ccircle cx='270.191' cy='460.713' r='237.845' transform='rotate(17.5802 270.191 460.713)' fill='%23FAC4ED'/%3E%3C/g%3E%3Cg filter='url(%23filter1_f_3539_399128)'%3E%3Ccircle cx='54.6897' cy='520.514' r='191.458' transform='rotate(17.5802 54.6897 520.514)' fill='%23DCC5FF'/%3E%3Ccircle cx='54.6897' cy='520.514' r='191.458' transform='rotate(17.5802 54.6897 520.514)' fill='%23C7A3FF'/%3E%3C/g%3E%3Cg opacity='0.3' filter='url(%23filter2_f_3539_399128)'%3E%3Cpath d='M401.548 667.594C361.353 693.236 321.283 708.677 281.338 713.916C241.393 719.156 204.192 713.921 169.733 698.21C135.274 682.5 106.019 655.792 81.9653 618.087L68.6728 597.25L165.439 535.52L178.731 556.357C198.67 587.612 223.38 605.005 252.861 608.534C282.025 611.568 313.231 602.48 346.479 581.27C380.223 559.744 401.01 537.06 408.84 513.218C417.167 489.06 414.684 466.562 401.392 445.725C392.214 431.338 380.558 422.37 366.425 418.821C352.789 414.956 336.29 415.36 316.929 420.033C297.748 423.893 275.41 430.465 249.914 439.749L230.42 446.95C189.628 461.805 152.531 471.51 119.131 476.064C85.9112 479.806 56.0241 476.187 29.4699 465.206C3.41203 453.908 -19.7446 432.384 -39.9999 400.632C-60.2552 368.881 -70.0603 337.094 -69.4152 305.272C-68.5905 272.637 -58.3295 241.661 -38.6323 212.343C-18.7554 182.212 9.79187 155.276 47.0095 131.534C84.2271 107.791 121.341 93.1893 158.351 87.7276C195.541 81.4532 230.395 85.7436 262.911 100.599C295.608 114.641 323.983 140.515 348.036 178.22L362.278 200.545L265.512 262.275L251.27 239.95C238.611 220.105 224.513 206.762 208.978 199.921C193.622 192.266 177.008 190.3 159.136 194.024C140.947 197.251 121.928 205.195 102.079 217.858C72.3045 236.852 53.8616 256.644 46.7501 277.235C39.8183 297.014 42.5239 316.577 54.867 335.926C63.0957 348.825 73.284 357.682 85.4318 362.496C98.0759 366.994 112.996 367.947 130.192 365.353C147.388 362.759 167.832 357.047 191.522 348.216L211.016 341.015C253.297 325.211 292.04 314.805 327.246 309.796C362.947 304.472 394.977 307.073 423.337 317.6C451.696 328.127 476.003 349.267 496.259 381.018C516.514 412.77 526.208 446.024 525.34 480.78C524.652 514.723 513.852 548.138 492.939 581.023C472.207 613.095 441.743 641.953 401.548 667.594Z' fill='%23FAFAFA'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_3539_399128' x='-160.554' y='29.9673' width='861.491' height='861.491' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='96.4185' result='effect1_foregroundBlur_3539_399128'/%3E%3C/filter%3E%3Cfilter id='filter1_f_3539_399128' x='-329.657' y='136.167' width='768.693' height='768.693' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='96.4185' result='effect1_foregroundBlur_3539_399128'/%3E%3C/filter%3E%3Cfilter id='filter2_f_3539_399128' x='-84.2048' y='70.1731' width='624.358' height='660.469' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='7.37986' result='effect1_foregroundBlur_3539_399128'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");

  @media screen and (min-width: 992px) {
    background-image: url("data:image/svg+xml,%0A%3Csvg width='1920' height='1080' viewBox='0 0 1920 1080' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_f_3539_399193)'%3E%3Ccircle cx='1191.81' cy='991.94' r='548.231' transform='rotate(17.5802 1191.81 991.94)' fill='%23FAC4ED'/%3E%3C/g%3E%3Cg filter='url(%23filter1_f_3539_399193)'%3E%3Ccircle cx='695.076' cy='1129.78' r='441.309' transform='rotate(17.5802 695.076 1129.78)' fill='%23DCC5FF'/%3E%3Ccircle cx='695.076' cy='1129.78' r='441.309' transform='rotate(17.5802 695.076 1129.78)' fill='%23C7A3FF'/%3E%3C/g%3E%3Cg opacity='0.3' filter='url(%23filter2_f_3539_399193)'%3E%3Cpath d='M1494.58 1468.8C1401.93 1527.9 1309.57 1563.5 1217.5 1575.57C1125.43 1587.65 1039.68 1575.58 960.25 1539.37C880.823 1503.16 813.388 1441.6 757.946 1354.69L727.307 1306.66L950.351 1164.37L980.99 1212.4C1026.95 1284.44 1083.91 1324.53 1151.86 1332.67C1219.08 1339.66 1291.01 1318.71 1367.65 1269.82C1445.43 1220.21 1493.34 1167.92 1511.39 1112.96C1530.58 1057.28 1524.86 1005.42 1494.22 957.393C1473.07 924.23 1446.2 903.559 1413.62 895.38C1382.19 886.471 1344.16 887.402 1299.54 898.173C1255.32 907.07 1203.83 922.219 1145.07 943.619L1100.13 960.217C1006.11 994.457 920.6 1016.83 843.613 1027.32C767.041 1035.95 698.151 1027.61 636.944 1002.3C576.881 976.255 523.505 926.642 476.817 853.455C430.129 780.268 407.528 707 409.015 633.65C410.916 558.427 434.567 487.027 479.969 419.449C525.785 349.998 591.587 287.91 677.373 233.184C763.159 178.458 848.707 144.801 934.015 132.211C1019.74 117.749 1100.07 127.638 1175.03 161.88C1250.39 194.248 1315.79 253.886 1371.24 340.796L1404.06 392.255L1181.02 534.543L1148.19 483.083C1119.01 437.341 1086.52 406.586 1050.71 390.815C1015.31 373.172 977.018 368.641 935.823 377.223C893.898 384.661 850.059 402.974 804.307 432.161C735.678 475.942 693.167 521.563 676.775 569.025C660.797 614.614 667.034 659.708 695.484 704.306C714.451 734.038 737.935 754.453 765.936 765.551C795.081 775.92 829.471 778.114 869.109 772.135C908.746 766.157 955.867 752.99 1010.47 732.635L1055.41 716.038C1152.86 679.609 1242.17 655.622 1323.32 644.078C1405.61 631.805 1479.44 637.801 1544.8 662.066C1610.17 686.331 1666.2 735.058 1712.89 808.244C1759.58 881.431 1781.92 958.081 1779.92 1038.19C1778.34 1116.43 1753.44 1193.45 1705.24 1269.25C1657.45 1343.18 1587.23 1409.7 1494.58 1468.8Z' fill='%23FAFAFA'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_3539_399193' x='198.943' y='-0.925781' width='1985.73' height='1985.73' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='222.244' result='effect1_foregroundBlur_3539_399193'/%3E%3C/filter%3E%3Cfilter id='filter1_f_3539_399193' x='-190.84' y='243.864' width='1771.83' height='1771.83' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='222.244' result='effect1_foregroundBlur_3539_399193'/%3E%3C/filter%3E%3Cfilter id='filter2_f_3539_399193' x='374.925' y='91.7483' width='1439.14' height='1522.38' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='17.0105' result='effect1_foregroundBlur_3539_399193'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");
  }

}
</style>
