<template>
  <header class="flex justify-start w-full h-[700px] bg-slate-950 flex-grow">
    <div class="header">
      <div class="w-full">
        <div class="flex flex-col m-32">
          <h1 class="text-5xl font-black text-white">
            Do your shopping here. <br />
            And be even more
            <br />
            happy!
          </h1>
          <p class="text-lg font-medium text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br />
            Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
      <img
        class="w-[728px]"
        src="../assets/images/arranjo-de-colecao-estacionario-moderno_23-2149309641.svg"
        alt=""
      />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-image: url('../../src/assets/images/arranjo-de-colecao-estacionario-moderno_23-2149309641.svg');
  background-size: 728px;
  background-repeat: no-repeat;
  background-position: 200% 50%;
}
</style>
