export default function AboutTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">关于本项目</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">项目背景</h3>
            <p className="text-gray-600 leading-relaxed">
              本项目是为准备医保信息系统相关岗位面试，基于职位描述（JD）要求所搭建的模拟系统。
              通过可视化演示，证明对医保核心业务的理解和技术实现能力。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Next.js 14</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">React 18</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">localStorage</span>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">核心功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DIP/DRG分组器</h4>
                <p className="text-sm text-blue-600">
                  模拟病种分组逻辑，根据诊断自动归入对应DRG组并确定打包价格
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">智能结算</h4>
                <p className="text-sm text-green-600">
                  支持本地和跨省异地就医的差异化结算规则
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">政策配置</h4>
                <p className="text-sm text-purple-600">
                  可动态配置报销比例、起付线和DRG打包价格
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">实时响应</h4>
                <p className="text-sm text-orange-600">
                  政策变更后系统立即生效，实现快速业务适配
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">业务理解</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>医保核心业务流程：</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>患者就诊并选择诊断病种</li>
                <li>系统根据DIP/DRG规则自动分组并确定打包价格</li>
                <li>根据就医类型（本地/异地）应用不同报销政策</li>
                <li>计算医保统筹支付和个人自付金额</li>
                <li>生成结算单并完成结算流程</li>
              </ol>

              <p className="text-gray-700 leading-relaxed mt-4 mb-3">
                <strong>政策响应机制：</strong>
              </p>
              <p className="text-gray-600 leading-relaxed">
                通过配置化管理实现业务规则与系统逻辑解耦，当医保政策调整时，
                只需修改配置参数即可快速响应，无需重新开发系统，大幅提升政策适应性。
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">设计理念</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <strong>业务优先：</strong>界面简洁直观，所有功能点直接对应业务需求
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <strong>即时反馈：</strong>所有操作立即在界面反映结果，数据透明可见
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <strong>前端自治：</strong>完全基于localStorage，无后端依赖，便于演示
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}