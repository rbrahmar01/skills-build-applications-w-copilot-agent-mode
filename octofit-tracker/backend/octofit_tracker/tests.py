from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import User, Team, Activity, Workout, Leaderboard

class APISmokeTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('workouts', response.data)
        self.assertIn('leaderboards', response.data)

    def test_users_endpoint(self):
        response = self.client.get('/users/')
        self.assertIn(response.status_code, [200, 403])

    def test_teams_endpoint(self):
        response = self.client.get('/teams/')
        self.assertIn(response.status_code, [200, 403])

    def test_activities_endpoint(self):
        response = self.client.get('/activities/')
        self.assertIn(response.status_code, [200, 403])

    def test_workouts_endpoint(self):
        response = self.client.get('/workouts/')
        self.assertIn(response.status_code, [200, 403])

    def test_leaderboards_endpoint(self):
        response = self.client.get('/leaderboards/')
        self.assertIn(response.status_code, [200, 403])
