from django.core.management.base import BaseCommand
from django.utils import timezone
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Clearing existing data...'))
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel', description='Team Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='Team DC Superheroes')

        self.stdout.write(self.style.SUCCESS('Creating users (superheroes)...'))
        heroes_data = [
            ('Tony Stark', 'ironman@marvel.com', marvel, True),
            ('Steve Rogers', 'captain@marvel.com', marvel, True),
            ('Natasha Romanoff', 'blackwidow@marvel.com', marvel, True),
            ('Bruce Wayne', 'batman@dc.com', dc, True),
            ('Clark Kent', 'superman@dc.com', dc, True),
            ('Diana Prince', 'wonderwoman@dc.com', dc, True),
        ]

        users = []
        for name, email, team, is_superhero in heroes_data:
            users.append(User.objects.create(name=name, email=email, team=team, is_superhero=is_superhero))

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        workout1 = Workout.objects.create(name='Strength Training', description='Full body strength circuit')
        workout1.suggested_for.set([marvel, dc])
        workout2 = Workout.objects.create(name='Cardio Blast', description='HIIT cardio')
        workout2.suggested_for.set([marvel])
        workout3 = Workout.objects.create(name='Agility Drills', description='Speed and agility')
        workout3.suggested_for.set([dc])

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        today = timezone.now().date()
        Activity.objects.create(user=users[0], type='Run', duration=30, date=today)
        Activity.objects.create(user=users[1], type='Swim', duration=45, date=today)
        Activity.objects.create(user=users[2], type='Yoga', duration=60, date=today)
        Activity.objects.create(user=users[3], type='Cycling', duration=40, date=today)
        Activity.objects.create(user=users[4], type='Weights', duration=50, date=today)
        Activity.objects.create(user=users[5], type='Pilates', duration=35, date=today)

        self.stdout.write(self.style.SUCCESS('Calculating leaderboard points...'))
        marvel_points = Activity.objects.filter(user__team=marvel).count() * 10
        dc_points = Activity.objects.filter(user__team=dc).count() * 10
        Leaderboard.objects.create(team=marvel, points=marvel_points)
        Leaderboard.objects.create(team=dc, points=dc_points)

        self.stdout.write(self.style.SUCCESS('Database population complete.'))
