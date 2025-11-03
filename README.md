# 医保核心逻辑模拟系统 (Simu-HIMS)

一个基于Next.js开发的医保信息系统模拟演示系统，用于展示对医保核心业务（DIP/DRG、结算平台、政策变更响应）的理解。

## 🎯 项目目标

- **业务理解验证：** 证明对医保核心业务的深入理解
- **快速学习能力：** 展示一周内掌握新行业核心业务的能力
- **技术实现能力：** 将复杂需求转化为清晰的系统模块

## ✨ 核心功能

### 1. DIP/DRG分组器 (模拟)
- 病种选择和智能分组
- 自动显示DRG组别和打包价格
- 支持多种常见病种

### 2. 门诊/住院结算 (模拟)
- 患者登记（姓名、身份证号、病种选择）
- 支持本地和跨省异地就医
- 实时结算和费用计算

### 3. 结算结果展示
- 详细的结算单显示
- 医保统筹支付计算
- 个人自付金额计算

### 4. 医保政策配置中心
- 动态配置报销比例
- 可调整起付线标准
- 实时修改DRG打包价格
- 配置立即生效

## 🛠 技术栈

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Data Storage:** localStorage (前端模拟)
- **State Management:** React Hooks

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React组件
│   ├── AboutTab.tsx       # 关于页面
│   ├── BusinessTab.tsx    # 业务办理页面
│   ├── DRGGrouper.tsx     # DRG分组器组件
│   ├── PatientRegistration.tsx # 患者登记组件
│   ├── PolicyConfig.tsx   # 政策配置组件
│   ├── SettlementResult.tsx # 结算结果组件
│   └── TabLayout.tsx      # Tab布局组件
├── data/                  # 数据文件
│   └── drgCatalog.ts      # DRG病种目录
└── lib/                   # 工具类
    ├── drgGrouper.ts      # DRG分组器逻辑
    ├── patientData.ts     # 患者数据管理
    ├── policyRules.ts     # 政策规则管理
    └── settlementCalculator.ts # 结算计算器
```

## 🚀 使用方法

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:3000
```

### 生产环境
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📋 演示流程

### 基础业务流程演示
1. **本地患者结算**
   - 选择"急性阑尾炎"
   - 系统自动分组并显示价格
   - 填写患者信息并结算
   - 查看结算结果

2. **跨省异地就医**
   - 勾选"跨省异地就医"
   - 观察报销比例变化
   - 比较结算结果差异

3. **政策变更响应**
   - 切换到"政策配置"标签
   - 修改病种价格和报销比例
   - 保存配置
   - 返回业务办理验证新规则生效

## 💡 设计理念

- **业务优先：** 界面简洁直观，功能对应业务需求
- **即时反馈：** 所有操作立即反映结果
- **前端自治：** 完全基于localStorage，无后端依赖
- **配置化管理：** 业务规则与系统逻辑解耦

## 📄 许可证

本项目仅用于面试演示目的。

---

*注：这是一个演示系统，所有数据均为模拟数据，不包含真实患者信息。*