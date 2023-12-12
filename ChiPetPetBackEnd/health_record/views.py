from django.shortcuts import render
import json
from django.db import connection
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import base64

# Create your views here.


@csrf_exempt
def upload_health_record(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            pet_id = data.get('pet_id')
            date = data.get('date')
            fertility = data.get('fertility')
            health_report = data.get('health_report')

            # Check if all required fields are present
            if pet_id is None or date is None or fertility is None or health_report is None:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Insert into the health_record table
            cursor = connection.cursor()
            
            cursor.execute("INSERT INTO health_record (pet_id, date, fertility, health_report) VALUES (%s, %s, %s, %s)",
                            (pet_id, date, fertility, health_report))

            return JsonResponse({'status': 'Health record inserted successfully'}, status=201)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format: {}'.format(str(e))}, status=400)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_health_records_by_pet(request):
    if request.method == 'GET':
        try:
            pet_id = request.GET.get('pet_id')

            # Retrieve health records for the specified pet_id
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM health_record WHERE pet_id = %s", (pet_id,))
            health_records = cursor.fetchall()

            # Convert the results to a list of dictionaries
            health_records_list = [
                {
                    'pet_id': record[0],
                    'date': record[1].isoformat(),  # Convert date to ISO format for better serialization
                    'fertility': record[2],
                    'health_report': record[3],
                }
                for record in health_records
            ]

            return JsonResponse(health_records_list, safe=False)
        
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format: {}'.format(str(e))}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)