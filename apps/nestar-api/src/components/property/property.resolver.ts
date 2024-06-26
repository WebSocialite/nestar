import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Properties, Property } from '../../libs/dto/property/property';
import { AgentPropertiesInquiry, AllPropertiesInquiry, OrdinaryInquiry, PropertiesInquiry, PropertyInput } from '../../libs/dto/property/property.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { PropertyUpdate } from '../../libs/dto/property/property.update';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyService: PropertyService) {}


    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => Property)
    public async createProperty(
        @Args('input') input: PropertyInput, 
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Property> {
        console.log("Mutation: createProperty");
        input.memberId = memberId;
        return await this.propertyService.createProperty(input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Property)
    public async getProperty(
        @Args('propertyId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ) :Promise<Property> {
        console.log("Query: getProperty");
        const propertyId = shapeIntoMongoObjectId(input);
        return await this.propertyService.getProperty(memberId, propertyId);
    }
    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation((returns) => Property)
    public async updateProperty(
        @Args('input') input: PropertyUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ) :Promise<Property> {
        console.log("Mutation: updateProperty");
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.propertyService.updateProperty(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Properties)   // property me liked ni faqat userlar qila oladi agentlar qilsa bolmaydi
    public async getProperties(
        @Args('input') input: PropertiesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Properties> {
        console.log('Query: getProperties');
        return await this.propertyService.getProperties(memberId, input);
    }

    @UseGuards(AuthGuard)
    @Query((returns) => Properties)   
    public async getFavorites(
        @Args('input') input: OrdinaryInquiry, // backendga kirib kelishga qadar bulgan validationni qabul qladi
        @AuthMember('_id') memberId: ObjectId,  // Authmember param decoratorida memberId ni hosil qilyapmiz
    ): Promise<Properties> {
        console.log('Query: getFavorites');
        return await this.propertyService.getFavorites(memberId, input);
    }


    @UseGuards(AuthGuard)
    @Query((returns) => Properties)   
    public async getVisited(
        @Args('input') input: OrdinaryInquiry, // backendga kirib kelishga qadar bulgan validationni qabul qladi
        @AuthMember('_id') memberId: ObjectId,  // Authmember param decoratorida memberId ni hosil qilyapmiz
    ): Promise<Properties> {
        console.log('Query: getVisited');
        return await this.propertyService.getVisited(memberId, input);
    }


    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Query((returns) => Properties)
    public async getAgentProperties(
        @Args('input') input: AgentPropertiesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ) :Promise<Properties> {
        console.log("Mutation: getAgentProperties");
        return await this.propertyService.getAgentProperties(memberId, input);

}
    //**                    Like logic               */

    @UseGuards(AuthGuard) 
    @Mutation(() => Property)
     public async likeTargetProperty
     (@Args("propertyId") input: string,
      @AuthMember('_id') propertyId: ObjectId
    ): Promise<Property> {
        console.log("Query: likeTargetProperty");
        const likeRefId = shapeIntoMongoObjectId(input);
        return await this.propertyService.likeTargetProperty(propertyId, likeRefId);
    }




            /**     ADMIN     **/

 @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query((returns) => Properties)
    public async getAllPropertiesByAdmin(
        @Args('input') input: AllPropertiesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ) :Promise<Properties> {
        console.log("Query: getAllPropertiesByAdmin");
        return await this.propertyService.getAllPropertiesByAdmin( input);
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation((returns) => Property)
    public async updatePropertyByAdmin(
        @Args('input') input: PropertyUpdate,
    ) :Promise<Property> {
        console.log("Query: updatePropertyByAdmin");
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.propertyService.updatePropertyByAdmin( input);
}

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation((returns) => Property)
    public async removePropertyByAdmin(
        @Args('propertyId') input: string,
    ) :Promise<Property> {
        console.log("Query: removePropertyByAdmin");
        const propertyId = shapeIntoMongoObjectId(input);
        return await this.propertyService.removePropertyByAdmin(propertyId);
}

}