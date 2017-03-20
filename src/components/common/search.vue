<template>
    <div class="query-condition">
        <el-form :model="mate.values" :inline="true">
            <template v-for="field of mate.fields">
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'text'">
                    <el-input v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-input>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'password'">
                    <el-input type="password" v-model="mate.values[field.name]" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'select'">
                    <el-select v-model="mate.values[field.name]" :placeholder="field.placeholder">
                        <el-option :label="item.label" :value="item.value" v-for="item of field.options"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'date'">
                    <el-date-picker type="date" v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-date-picker>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'time'">
                    <el-time-picker type="fixed-time" v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-time-picker>
                </el-form-item>
                <el-form-item :label="field.label" v-if="field.holder == 'switch'">
                    <el-switch :on-text="field.on" :off-text="field.off" v-model="mate.values[field.name]"></el-switch>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'checkbox'">
                    <el-checkbox-group v-model="mate.values[field.name]">
                        <el-checkbox :label="item.label" :name="field.name" v-for="item of field.options"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'radio'">
                    <el-radio-group v-model="mate.values[field.name]">
                        <el-radio :label="item.label" v-for="item of field.options"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'textarea'">
                    <el-input type="textarea" v-model="mate.values[field.name]"></el-input>
                </el-form-item>
            </template>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <el-button @click="handleReset" v-if="!mate.inline">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>