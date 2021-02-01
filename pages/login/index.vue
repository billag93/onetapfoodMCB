<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col align="center" justify="center">
                <v-sheet rounded max-width="50vw" class="ma-6 pa-3" color="primary">
                    <v-card
                class="ma-10 pa-8"
                elevation-2
                max-width="50vw"
                >
                <v-row align="center" justify="center" ><v-card-title >Login</v-card-title></v-row>
                    <v-text-field
                    label="Username"
                    >
                    </v-text-field>
                    <v-text-field
                    label="Password"
                    >
                    </v-text-field>
                    <v-row>
                         <v-btn color="success">Login</v-btn>
                         <v-spacer></v-spacer>
                         <v-btn color="success">Register</v-btn>
                    </v-row>
                </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>