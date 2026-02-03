<div class="container demo-page">
	<!-- Header -->
	<header class="demo-header">
		<h1>設計規範展示</h1>
	</header>

	<!-- Typography Section -->
	<section class="demo-section">
		<h2 class="section-title">📝 字型系統</h2>

		<div class="subsection">
			<h3 class="subsection-title">標題層級</h3>
			<div class="content-box">
				<h1>H1 標題 - 1.5rem</h1>
				<h2>H2 標題 - 1.25rem</h2>
				<h3>H3 標題 - 1.125rem</h3>
				<h4>H4 標題 - 1rem</h4>
				<h5>H5 標題 - 1rem</h5>
				<h6>H6 標題 - 1rem</h6>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">段落與連結</h3>
			<div class="content-box">
				<p>這是一段普通的段落文字。Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<p>這是一段包含 <a href="#">連結文字</a> 的段落，滑鼠移到連結上會有效果。</p>
			</div>
		</div>
	</section>

	<!-- Form Elements Section -->
	<section class="demo-section">
		<h2 class="section-title">📋 表單元素</h2>

		<div class="subsection">
			<h3 class="subsection-title">按鈕</h3>
			<div class="content-box">
				<div class="button-group">
					<button>基礎按鈕</button>
					<button disabled>禁用按鈕</button>
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">輸入欄位</h3>
			<div class="content-box">
				<form class="form-demo">
					<p>
						<label for="input1">輸入框：</label>
						<input id="input1" type="text" placeholder="請輸入文字" />
					</p>
					<p>
						<label for="input2">禁用輸入框：</label>
						<input id="input2" type="text" placeholder="禁用狀態" disabled />
					</p>
					<p>
						<label for="textarea1">文字區域：</label><br />
						<textarea id="textarea1" rows="4" placeholder="請輸入多行文字"></textarea>
					</p>
					<p>
						<label for="select1">下拉選單：</label>
						<select id="select1">
							<option>選項 1</option>
							<option>選項 2</option>
							<option>選項 3</option>
						</select>
					</p>
				</form>
			</div>
		</div>
	</section>

	<!-- Content Section -->
	<section class="demo-section">
		<h2 class="section-title">📚 內容元素</h2>

		<div class="subsection">
			<h3 class="subsection-title">列表</h3>
			<div class="content-box">
				<div class="list-grid">
					<div>
						<h4>無序列表</h4>
						<ul>
							<li>項目 1</li>
							<li>項目 2</li>
							<li>項目 3</li>
						</ul>
					</div>
					<div>
						<h4>有序列表</h4>
						<ol>
							<li>第一項</li>
							<li>第二項</li>
							<li>第三項</li>
						</ol>
					</div>
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">程式碼</h3>
			<div class="content-box">
				<p>行內程式碼：<code>const hello = 'world';</code></p>
				<pre><code>{'// 程式碼區塊\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}'}</code
					></pre>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">表格</h3>
			<div class="content-box">
				<table>
					<thead>
						<tr>
							<th>姓名</th>
							<th>年齡</th>
							<th>職位</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>張三</td>
							<td>28</td>
							<td>工程師</td>
						</tr>
						<tr>
							<td>李四</td>
							<td>32</td>
							<td>設計師</td>
						</tr>
						<tr>
							<td>王五</td>
							<td>25</td>
							<td>產品經理</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="subsection">
			<h3 class="subsection-title">圖片</h3>
			<div class="content-box">
				<img src="https://placehold.co/800x400" alt="示例圖片" />
			</div>
		</div>
		<div class="subsection">
			<h3 class="subsection-title">標籤 Badge</h3>
			<div class="content-box">
				<div class="badge-group">
					<span class="badge-text badge-primary">Primary</span>
					<span class="badge-text badge-warning">Warning</span>
					<span class="badge-text badge-danger">Danger</span>
					<span class="badge-text badge-success">Success</span>
					<span class="badge-text badge-info">Info</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.demo-page {
		padding: 2rem 0;
	}

	/* Header */
	.demo-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid var(--border-color);
	}

	.demo-header h1 {
		margin: 0;
		font-size: 2rem;
	}

	/* Section */
	.demo-section {
		margin-bottom: 3rem;
		padding: 2rem;
		background-color: var(--card-bg);
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-title {
		margin: 0 0 2rem 0;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
		font-size: 1.5rem;
		color: var(--text-color);
	}

	/* Subsection */
	.subsection {
		margin-bottom: 2rem;
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection-title {
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
		color: var(--text-secondary);
	}

	.content-box {
		padding: 1.5rem;
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;
	}

	/* Button Group */
	.button-group {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	/* Form */
	.form-demo {
		max-width: 600px;
	}

	.form-demo p {
		margin-bottom: 1rem;
	}

	.form-demo label {
		display: inline-block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.form-demo input,
	.form-demo textarea,
	.form-demo select {
		width: 100%;
		max-width: 500px;
	}

	/* List Grid */
	.list-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.list-grid h4 {
		margin-top: 0;
	}

	/* Badge Group */
	.badge-group {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		align-items: center;
	}

	/* Badge Styles */
	.badge-text {
		display: inline-block;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 0.375rem;
		transition: all 0.2s ease;
	}

	.badge-primary {
		background-color: var(--badge-success-bg);
		color: var(--badge-success-text);
	}

	.badge-warning {
		background-color: var(--badge-warning-bg);
		color: var(--badge-warning-text);
	}

	.badge-danger {
		background-color: var(--badge-danger-bg);
		color: var(--badge-danger-text);
	}

	.badge-success {
		background-color: var(--badge-success-bg);
		color: var(--badge-success-text);
	}

	.badge-info {
		background-color: var(--badge-info-bg);
		color: var(--badge-info-text);
	}

	/* Badge Hover Effects */
	.badge-text:hover {
		opacity: 0.85;
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.demo-page {
			padding: 1rem 0;
		}

		.demo-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.demo-section {
			padding: 1.5rem;
		}

		.content-box {
			padding: 1rem;
		}

		.list-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
