<script>
import { defineComponent } from 'vue'
import '@/assets/swagger-ui.css'
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"


export default defineComponent({
  mounted() {
    SwaggerUIBundle({
      url: '/schema.yml',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset,
      ],
      layout: 'BaseLayout',
    })
  }
});
</script>

<template>
  <div id="swagger-ui"></div>
</template>