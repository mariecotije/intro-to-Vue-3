app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/

        `<div class="product-display">

      <div class="product-container">

        <div class="product-image">
          <img :class="{'out-of-stock-img': !inStock}" :src="image" :alt="description">
        </div>

        <div class="product-info">

          <h1>{{ title }}</h1>

          <a :href="url">Made by Vue Mastery</a>

          <p v-if="inStock">In Stock</p>
          <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p> -->
          <p v-else>Out of Stock</p>

        <!-- passing props -->
        <p> Shipping: {{shipping }}</p>

          <p v-if="onSale">{{sale}}</p>

          <h5>Variants</h5>
          <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateImage(updateVariant(index))"
            class="color-circle" :style="{ backgroundColor: variant.color}">
            {{ }}
          </div>

          <h5>Sizes</h5>
          <ul>
            <li v-for="(size, index) in sizes" :key="index"> {{ size }}</li>
          </ul>

          <button class="button" :class="{disabledButton: !inStock}" :disabled="!inStock" @click = "addToCart" > Add to
            Cart</button >

        <button class="button" :class="{ disabledButton: !inStock }"
        :disabled="!inStock" @click="removeFromCart"> Remove Item</button >

        </div >
      </div >
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div >`,


    data: function () {
        return {

            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'Warm fuzzy socks',
            selectedVariant: 0,
            url: 'https://en.wikipedia.org/wiki/Sock',
            //inventory: 50,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2234, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: ['35-38', '39-41', '42-46'],
            reviews: []

        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }

})