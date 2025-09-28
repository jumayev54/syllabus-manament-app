'use client'

import { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SyllabusReviewModal } from '@/components/approval/syllabus-review-modal'
import {
	FileText,
	Users,
	Clock,
	CheckCircle,
	Eye,
	AlertTriangle,
} from 'lucide-react'

export function DepartmentHeadDashboard() {
	const { user } = useAuth()
	const [activeTab, setActiveTab] = useState('overview')
	const [reviewingSyllabus, setReviewingSyllabus] = useState<string | null>(
		null
	)

	const pendingApprovals = [
		{
			id: '1',
			teacher: 'Dr. John Smith',
			course: 'CS 201 - Data Structures',
			submitted: '2024-01-20',
			priority: 'high',
			daysWaiting: 3,
			version: '1.0',
		},
		{
			id: '2',
			teacher: 'Prof. Jane Doe',
			course: 'CS 301 - Algorithms',
			submitted: '2024-01-19',
			priority: 'medium',
			daysWaiting: 4,
			version: '1.1',
		},
		{
			id: '3',
			teacher: 'Dr. Mike Johnson',
			course: 'CS 401 - Software Engineering',
			submitted: '2024-01-18',
			priority: 'low',
			daysWaiting: 5,
			version: '2.0',
		},
	]

	const recentActions = [
		{
			id: '1',
			action: 'approved',
			course: 'CS 101 - Introduction to Programming',
			teacher: 'Dr. John Smith',
			timestamp: '1 hour ago',
		},
		{
			id: '2',
			action: 'revision_requested',
			course: 'CS 301 - Algorithms',
			teacher: 'Prof. Jane Doe',
			timestamp: '3 hours ago',
		},
		{
			id: '3',
			action: 'approved',
			course: 'CS 202 - Object-Oriented Programming',
			teacher: 'Dr. Mike Johnson',
			timestamp: '1 day ago',
		},
	]

	const departmentStats = [
		{ title: 'Kafedra Fakulteti', value: '12', icon: Users, change: '+2' },
		{ title: "Faol o'quv dasturi", value: '24', icon: FileText, change: '+3' },
		{ title: 'Tasdiqlar kutilmoqda', value: '3', icon: Clock, change: '-1' },
		{
			title: 'Shu oyda tasdiqlangan',
			value: '8',
			icon: CheckCircle,
			change: '+5',
		},
	]

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high':
				return 'destructive'
			case 'medium':
				return 'secondary'
			case 'low':
				return 'outline'
			default:
				return 'secondary'
		}
	}

	const getActionColor = (action: string) => {
		switch (action) {
			case 'approved':
				return 'default'
			case 'revision_requested':
				return 'destructive'
			case 'pending':
				return 'secondary'
			default:
				return 'secondary'
		}
	}

	const getActionLabel = (action: string) => {
		switch (action) {
			case 'approved':
				return 'Approved'
			case 'revision_requested':
				return 'Revision Requested'
			case 'pending':
				return 'Pending'
			default:
				return action
		}
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'approvals':
				return (
					<div className='space-y-6'>
						<div className='flex justify-between items-center'>
							<h3 className='text-lg font-semibold'>Tasdiqlar kutilmoqda</h3>
							<Badge variant='secondary'>
								{pendingApprovals.length} tasdiqlar
							</Badge>
						</div>

						<div className='grid gap-4'>
							{pendingApprovals.map(approval => (
								<Card key={approval.id}>
									<CardHeader>
										<div className='flex justify-between items-start'>
											<div>
												<CardTitle className='text-base'>
													{approval.course}
												</CardTitle>
												<CardDescription>
													{approval.teacher} tomonidan yuborilgan{' '}
													{approval.submitted} • Versiya {approval.version}
												</CardDescription>
											</div>
											<div className='flex space-x-2'>
												<Badge variant={getPriorityColor(approval.priority)}>
													{approval.priority} ustuvorlik
												</Badge>
												{approval.daysWaiting > 3 && (
													<Badge variant='destructive'>
														<AlertTriangle className='w-3 h-3 mr-1' />
														{approval.daysWaiting} kun kutmoqda
													</Badge>
												)}
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div className='flex space-x-2'>
											<Button
												variant='outline'
												size='sm'
												onClick={() => setReviewingSyllabus(approval.id)}
											>
												<Eye className='mr-2 h-4 w-4' />
												Ko'rib chiqish
											</Button>
											<Button
												variant='default'
												size='sm'
												onClick={() => setReviewingSyllabus(approval.id)}
											>
												<CheckCircle className='mr-2 h-4 w-4' />
												Tez tasdiqlash
											</Button>
											<Button
												variant='destructive'
												size='sm'
												onClick={() => setReviewingSyllabus(approval.id)}
											>
												Tekshirishni talab qilish
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				)

			case 'faculty':
				return (
					<div className='space-y-6'>
						<h3 className='text-lg font-semibold'>Kafedra Fakulteti</h3>
						<div className='grid gap-4 md:grid-cols-2'>
							{[
								{
									name: 'Dr. John Smith',
									courses: 3,
									status: 'active',
									pending: 1,
								},
								{
									name: 'Prof. Jane Doe',
									courses: 2,
									status: 'active',
									pending: 1,
								},
								{
									name: 'Dr. Mike Johnson',
									courses: 4,
									status: 'active',
									pending: 1,
								},
								{
									name: 'Prof. Sarah Wilson',
									courses: 2,
									status: 'on_leave',
									pending: 0,
								},
							].map((faculty, index) => (
								<Card key={index}>
									<CardHeader>
										<div className='flex justify-between items-center'>
											<CardTitle className='text-base'>
												{faculty.name}
											</CardTitle>
											<Badge
												variant={
													faculty.status === 'active' ? 'default' : 'secondary'
												}
											>
												{faculty.status === 'active' ? 'Active' : 'On Leave'}
											</Badge>
										</div>
										<CardDescription>
											{faculty.courses} kurslar tayinlangan
											{faculty.pending > 0 &&
												` • ${faculty.pending} tasdiqlash kutilmoqda`}
										</CardDescription>
									</CardHeader>
								</Card>
							))}
						</div>
					</div>
				)

			default:
				return (
					<div className='space-y-6'>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							{departmentStats.map(stat => (
								<Card key={stat.title}>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{stat.title}
										</CardTitle>
										<stat.icon className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>{stat.value}</div>
										<p className='text-xs text-muted-foreground'>
											{stat.change} bu oy
										</p>
									</CardContent>
								</Card>
							))}
						</div>

						<div className='grid gap-6 md:grid-cols-2'>
							<Card>
								<CardHeader>
									<CardTitle>Oxirgi Amallar</CardTitle>
									<CardDescription>
										So'nggi o'quv dasturi tasdiqlash faoliyati
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{recentActions.map(action => (
											<div
												key={action.id}
												className='flex items-center justify-between'
											>
												<div className='flex-1'>
													<p className='text-sm font-medium'>{action.course}</p>
													<p className='text-xs text-muted-foreground'>
														{action.teacher} • {action.timestamp}
													</p>
												</div>
												<Badge variant={getActionColor(action.action)}>
													{getActionLabel(action.action)}
												</Badge>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Kafedra umumik ko'rinishi</CardTitle>
									<CardDescription>
										Asosiy ko'rsatkichlar va statistikalar
                    kafedra faoliyati haqida
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										<div className='flex justify-between items-center'>
											<span className='text-sm'>O'quv dasturini yakunlash</span>
											<Badge variant='default'>87%</Badge>
										</div>
										<div className='flex justify-between items-center'>
											<span className='text-sm'>Fakultet muvofiqligi</span>
											<Badge variant='default'>92%</Badge>
										</div>
										<div className='flex justify-between items-center'>
											<span className='text-sm'>Kutilayotgan sharhlar</span>
											<Badge variant='secondary'>3</Badge>
										</div>
										<div className='flex justify-between items-center'>
											<span className='text-sm'>O'rtacha ko'rib chiqish vaqti</span>
											<Badge variant='outline'>2.3 kun</Badge>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				)
		}
	}

	return (
		<>
			<DashboardLayout
				title='Kafedra boshqaruv paneli'
				subtitle={`${user?.departmentId} Department Management`}
				tabs={[
					{ id: 'overview', label: 'Umumiy koʻrinish', icon: FileText },
					{ id: 'approvals', label: 'Kutilayotgan Tasdiqlar', icon: Clock },
					{ id: 'faculty', label: 'Fakultet boshqaruvi', icon: Users },
				]}
				activeTab={activeTab}
				onTabChange={setActiveTab}
			>
				{renderContent()}
			</DashboardLayout>

			{reviewingSyllabus && (
				<SyllabusReviewModal
					syllabusId={reviewingSyllabus}
					reviewerRole='department_head'
					onClose={() => setReviewingSyllabus(null)}
					onAction={(action, comments) => {
						console.log(`${action} syllabus ${reviewingSyllabus}:`, comments)
						setReviewingSyllabus(null)
						// Refresh pending approvals
					}}
				/>
			)}
		</>
	)
}
