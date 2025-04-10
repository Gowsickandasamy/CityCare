from django.db import transaction
from .models import Complaint
from officers.models import Officer
from django.core.exceptions import ObjectDoesNotExist

def create_complaint(user, title, description, area_name, location_link):
    with transaction.atomic():
        officer = Officer.objects.filter(area_of_control=area_name).first()
        
        if officer is None:
            print(f"No officer found for area '{area_name}'")
            return {"error": f"No officer found for area '{area_name}'"}
        
        admin = officer.reports_to if officer.reports_to else None

        print(f"Creating complaint for officer: {officer}, User: {user}")

        complaint = Complaint.objects.create(
            user=user,
            officer=officer.user,
            admin=admin,
            title=title,
            description=description,
            area_name=area_name,
            location_link=location_link
        )
        
        print(f"Complaint created: {complaint}")
        return {"complaint": complaint}
    
def get_complaints(admin_id=None, officer_id=None, user_id=None):
    with transaction.atomic():
        complaints = None
        
        if admin_id:
            complaints = Complaint.objects.filter(admin_id=admin_id).select_related('user', 'officer', 'admin')
        elif officer_id:
            complaints = Complaint.objects.filter(officer_id=officer_id).select_related('user', 'officer', 'admin')
        elif user_id:
            complaints = Complaint.objects.filter(user_id=user_id).select_related('user', 'officer', 'admin')
        else:
            return "No Complaints"

        if not complaints.exists():
            return "No Complaints"
        
        # Prepare the result with usernames
        result = []
        for complaint in complaints:
            result.append({
                "id": complaint.id,
                "user": complaint.user.username if complaint.user else None,
                "officer": complaint.officer.username if complaint.officer else None,
                "admin": complaint.admin.username if complaint.admin else None,
                "title": complaint.title,
                "description": complaint.description,
                "area_name": complaint.area_name,
                "location_link": complaint.location_link,
                "created_at": complaint.created_at,
                "status": complaint.status
            })
        
        return result
    
def get_complaint(id):
    with transaction.atomic():
        complaint = Complaint.objects.filter(id=id).select_related('user', 'officer', 'admin').first()
        
        if complaint is None:
            return {"error": f"No Complaint found with id '{id}'"}
        
        return {
            "complaint": {
                "id": complaint.id,
                "user": complaint.user.username if complaint.user else None,
                "officer": complaint.officer.username if complaint.officer else None,
                "admin": complaint.admin.username if complaint.admin else None,
                "title": complaint.title,
                "description": complaint.description,
                "area_name": complaint.area_name,
                "location_link": complaint.location_link,
                "created_at": complaint.created_at,
                "status": complaint.status
            }
        }

        
def edit_complaint(id,user, title, description, area_name, location_link):
    with transaction.atomic():
        complaint = Complaint.objects.filter(id=id).first()
        
        if(complaint is None):
            return {"error": f"No Complaint found with id '{id}'"}
        
        officer = Officer.objects.filter(area_of_control=area_name).first()
        
        if officer is None:
            print(f"No officer found for area '{area_name}'")
            return {"error": f"No officer found for area '{area_name}'"}
        
        admin = officer.reports_to if officer.reports_to else None

        print(f"Creating complaint for officer: {officer}, User: {user}")

        complaint.user = user
        complaint.officer = officer.user
        complaint.admin = admin
        complaint.title = title
        complaint.description = description
        complaint.area_name = area_name
        complaint.location_link = location_link
        complaint.save()  # Save the changes

        print(f"Complaint updated: {complaint}")
        return {"complaint": complaint}
    

def change_status(id, status):
    with transaction.atomic():
        complaint = Complaint.objects.filter(id=id).first()
        
        if(complaint is None):
            return {"error": f"No Complaint found with id '{id}'"}
        
        complaint.status = status
        complaint.save()
        return {'Success':'Status was changed'}
    
def delete_complaint(id):
    with transaction.atomic():
        complaint = Complaint.objects.filter(id=id).first()
        
        if(complaint is None):
            return {"error": f"No Complaint found with id '{id}'"}
        
        complaint.delete()
        return {'Success':'Complaint was changed'}
