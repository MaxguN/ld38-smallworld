// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "GameFramework/Actor.h"
#include "ProceduralMeshComponent.h"
#include "SmallWorld.generated.h"

class UProceduralMeshComponent;

UCLASS()
class SMALLRTS_API ASmallWorld : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	ASmallWorld();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	void GenerateWorld();

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

private:
	UPROPERTY(EditAnywhere)
		float width = 32;
	UPROPERTY(EditAnywhere)
		float height = 15;
	UPROPERTY(EditAnywhere)
		float radius = 1000;

	UProceduralMeshComponent *mesh;
	TArray<UProceduralMeshComponent> meshes;
	TArray<FVector> vertices;
	TArray<int32> triangles;
};
