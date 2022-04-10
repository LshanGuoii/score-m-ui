<template>
  <div class="">
    <div class="top-content">
      <div>
        <el-upload
          action="/user/upload"
          class="upload-demo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
        >
          <!-- <img :src="imageUrl" class="avatar" /> -->
          <span v-if="!imageUrl"> 头像：</span>

          <el-avatar
            :size="size"
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          ></el-avatar>

          <div v-else style="display: inline-block">
            <el-button size="small" type="primary">点击上传</el-button>
          </div>
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </div>
      <!-- <el-calendar v-model="calendarValue" style="width: 500px; height: 500px">
      </el-calendar> -->
    </div>

    <el-divider />
    <el-descriptions
      v-if="userInfo.role === 1"
      class="margin-top"
      title="个人信息"
      :column="2"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="resetPassword"
          >重置密码</el-button
        >
        <el-button type="primary" size="small" @click="updataPassword = true"
          >修改密码</el-button
        >
      </template>
      <el-descriptions-item label="用户名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        userInfo.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ userInfo.sex ? "男" : "女" }}</el-descriptions-item
      >
      <el-descriptions-item label="系部">{{
        userInfo.departmentName
      }}</el-descriptions-item>

      <!-- <el-descriptions-item label="重置密码">
        <el-tag size="small">重置密码</el-tag>
      </el-descriptions-item> -->
    </el-descriptions>
    <el-descriptions
      v-if="userInfo.role === 2"
      class="margin-top"
      title="个人信息"
      :column="2"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="resetPassword"
          >重置密码</el-button
        >
        <el-button type="primary" size="small" @click="updataPassword = true"
          >修改密码</el-button
        >
      </template>
      <el-descriptions-item label="用户名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        userInfo.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ userInfo.sex ? "男" : "女" }}</el-descriptions-item
      >
      <el-descriptions-item label="系部">{{
        userInfo.departmentName
      }}</el-descriptions-item>
      <el-descriptions-item label="专业">{{
        userInfo.specializeName
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      v-if="userInfo.role === 0"
      class="margin-top"
      title="个人信息"
      :column="2"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="resetPassword"
          >重置密码</el-button
        >
        <el-button type="primary" size="small" @click="updataPassword = true"
          >修改密码</el-button
        >
      </template>
      <el-descriptions-item label="用户名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        userInfo.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ userInfo.sex ? "男" : "女" }}</el-descriptions-item
      >
      <!-- <el-descriptions-item label="系部">{{
        userInfo.departmentName
      }}</el-descriptions-item>
      <el-descriptions-item label="专业">{{
        userInfo.specializeName
      }}</el-descriptions-item> -->
    </el-descriptions>
    <el-dialog title="修改密码" :visible.sync="updataPassword" width="40%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updataPassword = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/user";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth"; // get token from cookie
import store from "../../store";

export default {
  name: "PersonInfo",

  computed: {
    ...mapGetters(["userInfo"]),
    headers() {
      return this.configHead();
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      editOperation: false,
      imageUrl: "",
      calendarValue: new Date(),
      data: "",
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      updataPassword: false,
    };
  },

  created() {
    console.log(this.userInfo);
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      this.imageUrl = this.userInfo.photo;
    },
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      const data = await store.dispatch("user/getInfo");
      this.$message({
        type: "success",
        message: "更换成功!",
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    configHead() {
      const config = {
        Authorization: getToken(),
      };

      return config;
    },
    resetPassword() {
      console.log("[ this.userInfo ]-219", this.userInfo);
      api.getReset(this.userInfo.username).then((res) => {
        console.log("[ res ]-123", res);
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updataPassword = true;
          api.getUpdata(this.ruleForm.pass).then((res) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.top-content {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
