from rest_framework import serializers
from django.contrib.auth.hashers import make_password # above line brings clear text passwords and hashes it out
from rest_framework.decorators import authentication_classes, permission_classes

from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):

# to create password
    def create(self, validated_data): #take validated data from the model which is in key value pair
        password = validated_data.pop('password', None) #pop out password 
        instance = self.Meta.model(**validated_data) # grad a instance of that user

        if password is not None: # if there is no password for that user
            instance.set_password(password) # set a password. set_password is given ny Django
        instance.save() #save instance of that user in DB
        return instance

    def update(self, instance, validated_data): # to update the values
        for attr, value in validated_data.items():
            if attr == 'passowrd':# if attribute is password,
                instance.set_password(value) # set_password again
            else: #rest of the attribute. By attribute, it means the fields in the table.
                setattr(instance, attr, value) # else update/ set attribute / reset attribute of the rest of the value.
                #They can get a value updation directly.
                        
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {'password' :{'write_only': True}} # extra parameters that has to be added/ modified in DB
        fields = ('name', 'email', 'password', 'phone', 'gender', 'is_active', 'is_staff', 'is_superuser')

        