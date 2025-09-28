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
import { Building2, Users, FileText, TrendingUp, BarChart3 } from 'lucide-react'

export function DeanDashboard() {
	const { user } = useAuth()
	const [activeTab, setActiveTab] = useState('overview')

	const collegeStats = [
		{ title: `Jami bo'limlar`, value: '8', icon: Building2, change: '+1' },
		{ title: `Fakultet a'zolari`, value: '156', icon: Users, change: '+12' },
		{ title: `Faol o'quv dasturi`, value: '342', icon: FileText, change: '+28' },
		{ title: 'Tugatish darajasi', value: '94%', icon: TrendingUp, change: '+3%' },
	]

	const departments = [
		{
			name: 'Computer Science',
			head: 'Prof. Sarah Johnson',
			faculty: 12,
			syllabi: 24,
			completion: 87,
		},
		{
			name: 'Mathematics',
			head: 'Dr. Robert Chen',
			faculty: 18,
			syllabi: 36,
			completion: 95,
		},
		{
			name: 'Physics',
			head: 'Prof. Maria Garcia',
			faculty: 15,
			syllabi: 30,
			completion: 92,
		},
		{
			name: 'Chemistry',
			head: 'Dr. James Wilson',
			faculty: 14,
			syllabi: 28,
			completion: 89,
		},
		{
			name: 'Biology',
			head: 'Prof. Lisa Anderson',
			faculty: 16,
			syllabi: 32,
			completion: 96,
		},
	]

	const getCompletionColor = (completion: number) => {
		if (completion >= 95) return 'default'
		if (completion >= 85) return 'secondary'
		return 'destructive'
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'departments':
				return (
					<div className='space-y-6'>
						<h3 className='text-lg font-semibold'>Kafedra umumiy ko'rinishi</h3>
						<div className='grid gap-4'>
							{departments.map((dept, index) => (
								<Card key={index}>
									<CardHeader>
										<div className='flex justify-between items-start'>
											<div>
												<CardTitle className='text-base'>{dept.name}</CardTitle>
												<CardDescription>
													Mudir: {dept.head} • {dept.faculty} fakultet •{' '}
													{dept.syllabi} o'quv dasturlari
												</CardDescription>
											</div>
											<Badge variant={getCompletionColor(dept.completion)}>
												{dept.completion}% to'liq
											</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<div className='flex space-x-2'>
											<Button variant='outline' size='sm'>
												Tafsilotlarni ko'rish
											</Button>
											<Button variant='outline' size='sm'>
												Aloqa rahbari
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				)

			case 'analytics':
				return (
					<div className='space-y-6'>
						<h3 className='text-lg font-semibold'>Kollej tahlili</h3>
						<div className='grid gap-6 md:grid-cols-2'>
							<Card>
								<CardHeader>
									<CardTitle>O'quv dasturini yakunlash tendentsiyalari</CardTitle>
									<CardDescription>
                  Kafedralar bo'yicha oylik bajarish stavkalari
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{departments.slice(0, 3).map((dept, index) => (
											<div
												key={index}
												className='flex items-center justify-between'
											>
												<span className='text-sm'>{dept.name}</span>
												<div className='flex items-center space-x-2'>
													<div className='w-24 bg-muted rounded-full h-2'>
														<div
															className='bg-primary h-2 rounded-full'
															style={{ width: `${dept.completion}%` }}
														></div>
													</div>
													<span className='text-sm font-medium'>
														{dept.completion}%
													</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Fakultet taqsimoti</CardTitle>
									<CardDescription>
                  Kafedralar bo'yicha o'qituvchilar soni
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{departments.slice(0, 3).map((dept, index) => (
											<div
												key={index}
												className='flex justify-between items-center'
											>
												<span className='text-sm'>{dept.name}</span>
												<Badge variant='outline'>{dept.faculty} fakultet</Badge>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				)

			default:
				return (
					<div className='space-y-6'>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							{collegeStats.map(stat => (
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
									<CardTitle>Oxirgi Harakatlar</CardTitle>
									<CardDescription>
                    So'nggi yangilanishlar va bildirishnomalar
                  </CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										<div className='flex items-center space-x-4'>
											<div className='w-2 h-2 bg-green-500 rounded-full'></div>
											<div className='flex-1'>
												<p className='text-sm'>
												Matematika fakulteti 95 foizga yakunlandi
												</p>
												<p className='text-xs text-muted-foreground'>
													2 soat oldin
												</p>
											</div>
										</div>
										<div className='flex items-center space-x-4'>
											<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
											<div className='flex-1'>
												<p className='text-sm'>
                        Fizika faniga yangi professor-o‘qituvchilar qo‘shildi
												</p>
												<p className='text-xs text-muted-foreground'>
													1 kun oldin
												</p>
											</div>
										</div>
										<div className='flex items-center space-x-4'>
											<div className='w-2 h-2 bg-orange-500 rounded-full'></div>
											<div className='flex-1'>
												<p className='text-sm'>
                        Kimyo bo'limiga e'tibor kerak
												</p>
												<p className='text-xs text-muted-foreground'>
													2 kun oldin
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Ustuvor Amallar</CardTitle>
									<CardDescription>
                  Dekan e'tiborini talab qiladigan narsalar
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										<div className='flex justify-between items-center'>
											<div>
												<p className='text-sm font-medium'>
                        Byudjetni ko'rib chiqish yig'ilishi
												</p>
												<p className='text-xs text-muted-foreground'>
													Kafedraning yillik  byudjetlari
												</p>
											</div>
											<Badge variant='destructive'>Ertaga</Badge>
										</div>
										<div className='flex justify-between items-center'>
											<div>
												<p className='text-sm font-medium'>
												Fakultetni ishga qabul qilish komissiyasi
												</p>
												<p className='text-xs text-muted-foreground'>
												KI kafedrasini kengaytirish
												</p>
											</div>
											<Badge variant='secondary'>Keyingi Hafta</Badge>
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
		<DashboardLayout
			title='Dekan boshqaruv paneli'
			subtitle={`${user?.departmentId} Kollej ma'muriyati`}
			tabs={[
				{ id: 'overview', label: 'Umumiy koʻrinish', icon: BarChart3 },
				{ id: 'departments', label: 'Kafedralar', icon: Building2 },
				{ id: 'analytics', label: 'Analitika', icon: TrendingUp },
			]}
			activeTab={activeTab}
			onTabChange={setActiveTab}
		>
			{renderContent()}
		</DashboardLayout>
	)
}
