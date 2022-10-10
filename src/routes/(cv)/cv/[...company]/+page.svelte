<script lang="ts">
	import Address from '$lib/components/Address.svelte';
	import { prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let hasCoverLetter: boolean = false;
	if (browser && $page.data.company) {
		prefetch('/cover-letter/' + $page.data.company)
			.then(() => (hasCoverLetter = true))
			.catch(() => (hasCoverLetter = false));
	}
</script>

<div class="flex justify-between items-center">
	<h1 class="text-6xl mb-4 font-bold print:mt-0 print:mb-2">Joe Innes</h1>
	<div class="text-right">
		<Address />
		{#if hasCoverLetter}
			<a
				href="/cover-letter/{$page.data.company}"
				class="no-underline text-right border rounded-xl p-2 cover-letter-link">Cover Letter</a
			>
		{/if}
	</div>
</div>
<div class="grid grid-cols-3 gap-2 divide-x">
	<div class="col-span-2 column">
		<section id="exp">
			<h2>Experience</h2>
			<h3>Tata Consultancy Services—Budapest, Hungary</h3>
			<h4>IT Infrastructure Services Group Lead</h4>
			<h5>Jul 2021—Present</h5>
			<ul>
				<li>
					Leading approximately 220 associates across Central and Eastern Europe in providing IT
					infrastructure support to customers in the manufacturing and utilities industry units.
				</li>
				<li>
					Management of client relations, financial and operational performance across contracts
					worth ~$10M in yearly revenue.
				</li>
			</ul>
			<h4>Service Delivery Manager</h4>
			<h5>Feb 2019—Jul 2021</h5>
			<ul>
				<li>
					Establishing and stabilising the European service desk for a large FMCG organisation.
				</li>
				<li>
					Ensuring consistent, excellent quality of service, performance against critical service
					levels, and customer satisfaction, in line with financial goals and business strategy.
				</li>
			</ul>
			<h4>Project Lead</h4>
			<h5>Aug 2017—Feb 2019</h5>
			<ul>
				<li>
					Establishing and maintaining the global service desk for a European aviation services
					company.
				</li>
				<li>
					Responsible for performance against service level agreements, recruitment and performance
					management processes, client relationship management.
				</li>
			</ul>
			<h4>Team Lead</h4>
			<h5>Jun 2016—Aug 2017</h5>
			<ul>
				<li>
					Coordination and enabling of support activities performed by a multilingual, international
					team of Service Desk Agents.
				</li>
				<li>
					Engagement with the client at a variety of hierarchical levels to understand and respond
					to business needs.
				</li>
			</ul>
			<h4>Subject Matter Expert</h4>
			<h5>Jan 2015—Jun 2016</h5>
			<ul>
				<li>Development and maintenance of the Knowledge Base.</li>
				<li>
					Performing duties as Single Point of Contact for North American and European markets,
					answering queries, providing advice and assistance to service delivery teams.
				</li>
			</ul>
			<h4>Service Desk Agent</h4>
			<h5>Apr 2014—Jan 2015</h5>
			<ul>
				<li>
					Diagnosis, triage, research, and resolution of users' issues with hundreds of software
					packages.
				</li>
				<li>
					Developed quality assurance tools and processes, and delivered training and support to
					others.
				</li>
			</ul>
			<details class="print:hidden">
				<summary>Earlier Jobs</summary>
				<div class="pt-4">
					<h3>inlingua—Belfort, France</h3>
					<h4>Formateur (Teacher of English)</h4>
					<h5>Sep 2013—Feb 2014</h5>
					<ul>
						<li>
							Teaching English in a variety of businesses, including English for specific purposes
							(such as management or HR) and technical language, as well as general conversational
							English.
						</li>
					</ul>

					<h3>MasterClass, BIS English, English Life—St. Petersburg, Russia</h3>
					<h4>TEFL Teacher</h4>
					<h5>Aug 2012—Aug 2013</h5>
					<ul>
						<li>
							Taught English, including language specific to human resources and marketing to
							Russian clients, including the head of human resources for one of the largest FMCGs in
							Russia, logistics and life sciences companies, and to young children.
						</li>
					</ul>

					<h3>Netherhall Learning Campus—Huddersfield, UK</h3>
					<h4>Teacher of MFL</h4>
					<h5>Jul 2011—Jul 2012</h5>
					<ul>
						<li>
							Maternity cover replacing Head of Department. Solely responsible for languages at the
							school. Taught groups aged from 11-15, across the ability spectrum, working with the
							AQA GCSE specification. Co-tutored a form group, and supervised this group during a
							residential visit.
						</li>
					</ul>
				</div>
			</details>
		</section>
	</div>
	<div class="column">
		<section>
			<h2>Education</h2>
			<h4>PGCE in Modern Foreign Languages</h4>
			<h5>The University of Sheffield, Sheffield, UK</h5>
			<h5>Sep 2010—Jun 2011</h5>
			<p>Post Graduate Certificate in Education</p>
			<h4>BA Hons French & Russian</h4>
			<h5>The University of Sheffield, Sheffield, UK</h5>
			<h5>Sep 2006—Jun 2010</h5>
			<p>Joint Honours French & Russian (Distinction in Spoken French)</p>
		</section>
		<section>
			<h2>Projects</h2>
			<h4>Team Lead Assessment Centre</h4>
			<p>
				Development of the process for selecting future team leads within TCS, designing the
				selection criteria. Overall ownership of management career path.
			</p>
			<h4>Internal Auditing</h4>
			<p>
				One of three IT IS internal auditors, conducting internal audits to help ensure compliance
				with certification requirements.
			</p>
			<h4>Pre-sales Support</h4>
			<p>
				Working alongside our internal pre-sales team to provide effort estimations and support
				pitches for potential new business, preparing RFP/RFI responses and executive summaries.
			</p>
		</section>
		<section class="prose">
			<h2>Languages</h2>
			<ul>
				<li>English (Native)</li>
				<li>French (C2)</li>
				<li>Russian (B2)</li>
				<li>Hungarian (B1)</li>
			</ul>
		</section>
	</div>
</div>

<style>
	section {
		@apply break-inside-avoid;
	}
	section * {
		@apply break-inside-avoid;
	}

	.prose {
		@apply print:leading-tight print:my-0 print:prose-sm;
	}
	.prose h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply my-1 table leading-tight break-before-auto break-after-avoid-page print:my-0 print:mb-0 !important;
		color: var(--semi-dark-text);
	}
	.prose h1,
	h2 {
		@apply border-b-4 my-2 print:my-0 !important;
		border-color: var(--accent);
		color: var(--dark-text);
	}
	h3 {
		@apply text-lg print:leading-none;
	}
	h4 {
		@apply text-base print:leading-[1.1em];
	}
	h5 {
		@apply uppercase text-xs;
	}
	ul {
		@apply print:my-0 print:mb-2 print:leading-snug !important;
	}
	ul.list-none {
		@apply pl-0;
	}
	ul.list-none li {
		@apply pl-0 mb-4 print:mb-2;
	}

	#exp ul li {
		@apply print:mb-1 print:mt-0 leading-snug;
	}
	p {
		@apply mt-2 mb-4 print:mb-2 print:mt-1 print:leading-snug !important;
	}

	.column:first-of-type {
		@apply pr-2;
	}
	.column:last-of-type {
		@apply pl-2;
	}

	.cover-letter-link {
		@apply transition-colors print:hidden;
		border-color: var(--dark-text);
	}
	.cover-letter-link:hover {
		background: var(--accent);
		color: var(--light-bg);
		border-color: var(--accent);
	}
</style>
